const redisClient = require("./redis"); 
const { deleteCache } = require("./cache");

// Invalidate all employer dashboard related caches
const invalidateEmployerDashboardCache = async (employerId) => {
  try {
    await deleteCache(`employer:${employerId}:recent-activity`);
    await deleteCache(`employer_stats_${employerId}`);
    await deleteCache(`applications_over_time_${employerId}`);
    await deleteCache(`employer:${employerId}:top-candidates`);
  } catch (err) {
    console.error("Error invalidating employer dashboard cache:", err.message);
  }
};

//Invalidate all user applications caches (all pages, all limits)
const invalidateUserApplicationsCache = async (userId) => {
  try {
    const keys = await redisClient.keys(`user_apps_${userId}_*`);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    // NEW
    await deleteCache(`user_app_stats_${userId}`);
    await deleteCache(`user_monthly_stats_${userId}`);

  } catch (err) {
    console.error("Error invalidating user applications cache:", err.message);
  }
};

// Invalidate all employer job listing caches
const invalidateEmployerJobsCache = async (employerId) => {
  try {
    const keys = await redisClient.keys(`employer_jobs_${employerId}_*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error("Error invalidating employer jobs cache:", err.message);
  }
};

// Invalidate all browse job caches
const invalidateBrowseJobsCache = async () => {
  try {
    const keys = await redisClient.keys(`browse_jobs_*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error("Error invalidating browse jobs cache:", err.message);
  }
};



module.exports = {
  invalidateEmployerDashboardCache,
   invalidateUserApplicationsCache,
   invalidateEmployerJobsCache,
  invalidateBrowseJobsCache,
};
