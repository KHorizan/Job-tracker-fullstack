const Job = require("../models/Job");
const Application = require("../models/Application");
const { getCache, setCache, deleteCache } = require("../utils/cache");
const { invalidateEmployerDashboardCache , invalidateEmployerJobsCache,invalidateBrowseJobsCache,} = require("../utils/cacheInvalidation");

// Helper for server errors
const handleServerError = (res, err, message = "Server error") => {
  console.error(message, err.message);
  res.status(500).json({ message, error: err.message });
};

// CREATE JOB 
const createJob = async (req, res) => {
  try {
    const { title, company, status, jobType, location, description, skills, experience, salaryMin, salaryMax } = req.body;

    if (!title || !company) return res.status(400).json({ message: "Title and Company are required" });

    const job = await Job.create({
      createdBy: req.user.id,
      title,
      company,
      status,
      jobType,
      location,
      description,
      skills,
      experience,
      salaryMin,
      salaryMax,
    });
 
    //  Invalidate related caches
    await invalidateEmployerJobsCache(req.user.id);
    await invalidateBrowseJobsCache();
    await invalidateEmployerDashboardCache(req.user.id);

    res.status(201).json(job);

  } catch (err) {
    handleServerError(res, err, "Failed to create job");
  }
};


// Get Jobs of Logged-in Employer 
const getJobs = async (req, res) => {
  try {
    const cacheKey = `employer_jobs_${req.user.id}_all`;
    const cached = await getCache(cacheKey);

    if (cached) return res.status(200).json(JSON.parse(cached));

    const jobs = await Job.find({ createdBy: req.user.id, isDeleted: false })
      .select("-createdBy")
      .sort({ createdAt: -1 })
      .lean();

    await setCache(cacheKey, jobs, 60); // cache for 60s
    res.status(200).json(jobs);
  } catch (err) {
    handleServerError(res, err, "Failed to fetch employer jobs");
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find job belonging to employer
    const job = await Job.findOne({
      _id: id,
      createdBy: req.user.id,
    });

    if (!job) {
      return res.status(404).json({message: "Job not found"});
    }

    //Apply updates
    Object.assign(job, updates);
    await job.save();

    //Invalidate related caches

    // Single job cache
    await deleteCache(`job_${id}`);

    // Employer job listings
    await invalidateEmployerJobsCache(req.user.id);

    // Public browse jobs
    await invalidateBrowseJobsCache();

    // Employer dashboard
    await invalidateEmployerDashboardCache(req.user.id);

    //Return updated job
    const updatedJob = await Job.findById(id)
      .select("-createdBy")
      .lean();

    res.status(200).json(updatedJob);

  }catch (err) {
    handleServerError(res, err, "Failed to update job");
  }
};

// Soft DELETE
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete job 
    const job = await Job.findOneAndUpdate(
  { _id: id, createdBy: req.user.id },
  { isDeleted: true }
);

    if (!job) {
      return res.status(404).json({message: "Job not found"});
    }

    //Invalidate related caches

    // Single job cache
    await deleteCache(`job_${id}`);

    await invalidateEmployerJobsCache(req.user.id);
   // Public browse jobs
    await invalidateBrowseJobsCache();
    // Employer dashboard
    await invalidateEmployerDashboardCache(req.user.id);

    //Send response
    res.status(200).json({message: "Job deleted successfully"});

  } catch (err) {
    handleServerError(res, err, "Failed to delete job");
  }
};

// BROWSE JOBS
const browseJobs = async (req, res) => {
  try {
    const { search, location, jobType, page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.max(Number(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const cacheKey = `browse_jobs_${search || ""}_${location || ""}_${jobType || ""}_${page}_${limit}`;

    let result;

    //checking cache
    const cached = await getCache(cacheKey);

    if (cached) {
      result = JSON.parse(cached);
    } else {
      // query
      const query = { isDeleted: false, status: "active" };
     if (search) query.$text = { $search: search };
      if (location) query.location = location;
      if (jobType) query.jobType = jobType;


      const jobs = await Job.find(query)
        .select("-createdBy")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean();

      const total = await Job.countDocuments(query);

      result = {
        jobs,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
      };

      // Cache ONLY base result (without applied)
      await setCache(cacheKey, result, 60);
    }

    //  Add applied flag dynamically ,Not caching this 
    let jobsWithApplied = result.jobs;

    if (req.user?.role === "jobseeker") {
      const applications = await Application.find({
        user: req.user.id,
        job: { $in: result.jobs.map((j) => j._id) },
      }).select("job");

      //set instead of arrays beacause it has O(1) lookup time.
      const appliedJobIds = new Set(
        applications.map((app) => app.job.toString())
      );

      jobsWithApplied = result.jobs.map((job) => ({
        ...job,
        applied: appliedJobIds.has(job._id.toString()),
      }));
    }

    //  Send response
    res.status(200).json({
      ...result,
      jobs: jobsWithApplied,
    });

  } catch (err) {
    handleServerError(res, err, "Failed to browse jobs");
  }
};
 
// GET SINGLE JOB
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `job_${id}`;

    let job;

    // Try cache first (ONLY base job data)
    const cached = await getCache(cacheKey);

    if (cached) {
      job = JSON.parse(cached);
    } else {
      job = await Job.findById(id)
        .select("-createdBy")
        .lean();

      if (!job) {
        return res.status(404).json({message: "Job not found"});
      }

      // Cache only job data (no applied flag)
      await setCache(cacheKey, job, 60);
    }

    // Add applied flag dynamically (NOT cached)
    let applied = false;

    if (req.user?.role === "jobseeker") {
      applied = !!(await Application.findOne({
        user: req.user.id,
        job: id,
      }).select("_id"));
    }

    //Send response
    res.status(200).json({
      ...job,
      applied,
    });

  } catch (err) {
    handleServerError(res, err, "Failed to fetch job details");
  }
};


module.exports = {createJob,getJobs,updateJob,deleteJob,browseJobs,getJobById};
