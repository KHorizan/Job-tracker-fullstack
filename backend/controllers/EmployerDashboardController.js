const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Activity = require("../models/Activity");
const { getCache,setCache } = require("../utils/cache");

// DASHBOARD STATS
const getEmployerDashboardStats = async (req, res) => {
  try {
    const employerId = req.user.id;
    const cacheKey = `employer_stats_${employerId}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));
    const last7days = new Date();
    last7days.setDate(last7days.getDate() - 7);

    
  const [totalJobs,activeJobs,totalApplications,recentApplications,] = await Promise.all([
  Job.countDocuments({ createdBy: employerId }),
  Job.countDocuments({ createdBy: employerId, status: "active" }),
  Application.countDocuments({ employer: employerId ,isDeleted:false}),
  Application.countDocuments({
    employer: employerId,
   createdAt: { $gte: last7days },
  }),
  ]);


    const result = { totalJobs, activeJobs, totalApplications, recentApplications };
    await setCache(cacheKey, result, 60); // cache for 60s
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Applications over time 
const getApplicationsOverTime = async (req, res) => {
  try {
    const employerId = req.user.id;
    const cacheKey = `applications_over_time_${employerId}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const applications = await Application.aggregate([
      {  $match: {
      employer: new mongoose.Types.ObjectId(employerId),
      isDeleted: false,
    },
    },
      {
        $group: {
          _id: { 
          $dateToString: { 
        format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const data = applications.map(a => ({ date: a._id, count: a.count }));
    await setCache(cacheKey, data, 60); // cache for 60s
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//RECENT ACTIVITY
const getRecentActivity = async (req, res) => {
  try {
    const employerId = req.user.id;
    const cacheKey = `employer:${employerId}:recent-activity`;

    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    //  Fetch From Activity Collection
    const activities = await Activity.find({
      employer: employerId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(7)
      .lean();

    await setCache(cacheKey, activities, 60);

    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
   

//Top candidates 

const getTopCandidates = async (req, res) => {
  try {
    const employerId = req.user.id;
    const cacheKey = `employer:${employerId}:top-candidates`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const applications = await Application.find({
      employer: employerId,
      status: "interview",
    })
      .populate("user", "name email")
      .populate("job", "title")
      .sort({ statusUpdatedAt: -1 })
      .limit(5)
      .lean();

    const response = {
      count: applications.length,
      candidates: applications.map((app) => ({
        candidate: app.user?.name,
        email: app.user?.email,
        jobTitle: app.job?.title,
        status: app.status,
      })),
    };

    await setCache(cacheKey, response,60);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getEmployerDashboardStats,
  getApplicationsOverTime,
  getRecentActivity,
  getTopCandidates,
};
