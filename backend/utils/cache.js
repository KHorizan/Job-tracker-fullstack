const { redisClient } = require("../config/redis");

const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Cache get error:", err.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 60) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (err) {
    console.log("Cache set error:", err.message);
  }
};



const deleteCache = async (keyOrPattern) => {
  try {
    // If it contains a wildcard, treat as pattern
    if (keyOrPattern.includes("*")) {
      const keys = await redisClient.keys(keyOrPattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } else {
      await redisClient.del(keyOrPattern);
    }
  } catch (err) {
    console.log("Cache delete error:", err.message);
  }
};



module.exports = { getCache, setCache, deleteCache };
