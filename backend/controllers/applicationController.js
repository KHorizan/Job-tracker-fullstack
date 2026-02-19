const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { getCache, setCache } = require("../utils/cache");
const {invalidateEmployerDashboardCache,invalidateUserApplicationsCache} = require("../utils/cacheInvalidation");

// Allowed application statuses
const APPLICATION_STATUSES = ["pending", "interview", "rejected"];

// Helper for server errors
const handleServerError = (res, err, message = "Server error") => {
  console.error(message, err.message);
  res.status(500).json({ message, error: err.message });
};

// Get paginated applications of logged-in user with caching
const getUserApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 30);
    const skip = (page - 1) * limit;

    const cacheKey = `user_apps_${userId}_${page}_${limit}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const filter = { user: userId, isDeleted: false };
    const totalApplications = await Application.countDocuments(filter);

    const applications = await Application.find(filter)
      .populate("job", "title company jobType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const result = {
      applications,
      pagination: {
        total: totalApplications,
        page,
        limit,
        totalPages: Math.ceil(totalApplications / limit),
        hasNextPage: page * limit < totalApplications,
        hasPrevPage: page > 1,
      },
    };

    await setCache(cacheKey, result, 60);
    res.status(200).json(result);
  } catch (err) {
    handleServerError(res, err, "Failed to fetch applications");
  }
};

// Get stats of user's applications
const getUserApplicationStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user_app_stats_${userId}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const stats = await Application.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), isDeleted: false } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formatted = { total: 0, pending: 0, interview: 0, rejected: 0 };
    stats.forEach((s) => {
      if (APPLICATION_STATUSES.includes(s._id)) {
        formatted[s._id] = s.count;
        formatted.total += s.count;
      }
    });

    await setCache(cacheKey, formatted, 60);
    res.status(200).json(formatted);
  } catch (err) {
    handleServerError(res, err, "Failed to fetch application stats");
  }
};

// Get monthly stats for charting
const getUserMonthlyStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user_monthly_stats_${userId}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const monthlyStats = await Application.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), isDeleted: false } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          interview: { $sum: { $cond: [{ $eq: ["$status", "interview"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatted = monthlyStats.map((item) => ({
      month: monthNames[item._id.month - 1],
      pending: item.pending,
      interview: item.interview,
      rejected: item.rejected,
    }));

    await setCache(cacheKey, formatted, 60);
    res.status(200).json(formatted);
  } catch (err) {
    handleServerError(res, err, "Failed to fetch monthly stats");
  }
};

// Apply to a Job
const applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({ user: userId, job: jobId }).lean();
    if (alreadyApplied) return res.status(400).json({ message: "Already applied to this job" });

    const application = await Application.create({
      user: userId,
      job: jobId,
      status: "pending",
    });

    await invalidateUserApplicationsCache(userId);
    await invalidateEmployerDashboardCache(job.createdBy);

    res.status(201).json({ message: "Applied successfully", application });
  } catch (err) {
    handleServerError(res, err, "Failed to apply to job");
  }
};

// Update application status (for employers/admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!APPLICATION_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    application.statusUpdatedAt = new Date();
    await application.save();

    await invalidateUserApplicationsCache(application.user.toString());

    const job = await Job.findById(application.job);
    if (job) await invalidateEmployerDashboardCache(job.createdBy);

    res.status(200).json({ message: "Application status updated successfully" });
  } catch (err) {
    handleServerError(res, err, "Failed to update application status");
  }
};

module.exports = {
  getUserApplication,
  getUserApplicationStats,
  getUserMonthlyStats,
  applyToJob,
  updateApplicationStatus,
};
