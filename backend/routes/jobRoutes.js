const express = require("express");
const router = express.Router();
const{createJob,getJobs,updateJob,deleteJob} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

//All routes protected
router.use(authMiddleware);

router.post("/",createJob);
router.get("/",getJobs);
router.patch("/:id",updateJob);
router.delete("/:id",deleteJob);

module.exports = router;