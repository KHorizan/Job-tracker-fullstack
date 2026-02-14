const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");

const getUserApplication= async(req,res)=>{
try{
 const userId = req.user.id;
 
  const limit = Number(req.query.limit)||0;
  const page = Number(req.query.page)||1;
  const skip = (page - 1) * limit;

  // Base filter
    const filter = { user: userId };
    const totalApplications = await Application.countDocuments(filter);


  const applications = await Application.find(filter)
      .populate("job", "title company jobType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      applications,
      pagination: {
        total: totalApplications,
        page,
        limit,
        totalPages: Math.ceil(totalApplications / limit),
        hasNextPage: page * limit < totalApplications,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.log("Headers received:", req.headers);
   console.log("Authorization header:", req.headers.authorization);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

const getUserApplicationStats = async(req,res)=>{
    try{
   const userId = req.user.id;
  
   const stats = await Application.aggregate([
   {$match:{user:new mongoose.Types.ObjectId(userId)}},
   {
    $group:{
        _id:"$status",
        count:{$sum:1},

    },
   },
   ]);

   const formatted={
    total:0,
    pending:0,
    interview:0,
    rejected:0
   }

stats.forEach(s=>{
    formatted[s._id] = s.count;
    formatted.total += s.count;
});

  //returning in order.
   const orderedStats = {
      total: formatted.total,
      pending: formatted.pending,
      interview: formatted.interview,
      rejected: formatted.rejected,
    };


  res.status(200).json(orderedStats);
    }catch(err){
   res.status(500).json({ message: "Server error" });
    }
};

const getUserMonthlyStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const monthlyStats = await Application.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { month: { $month: "$appliedOn" }, year: { $year: "$appliedOn" } },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
          },
          interview: {
            $sum: { $cond: [{ $eq: ["$status", "interview"] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

   const formatted = monthlyStats.map(item => {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      return {
        month: monthNames[item._id.month - 1],
        attended: item.interview,
        pending: item.pending,
        rejected: item.rejected
      };
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const applyToJob = async(req,res)=>{
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    // 1. Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
     const alreadyApplied = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // 3. Create application
    const application = await Application.create({
      user: userId,
      job: jobId,
      status: "pending",
    });
    res.status(201).json({ message: "Applied successfully", application });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateApplicationStatus = async(req,res)=>{
  try{
    const {status} = req.body;
    const {id} = req.params;

    const application = await Application.findById(id);
    if(!application){
      return res.status(404).json({message:"Application Not Found"});
    }
     //update status
    application.status = status;
    application.statusUpdatedAt = new Date();

    await application.save();

    res.status(200).json({message:"Application status changed successfully"});

  }catch(err){
    res.status(500).json({message:"Unable to update application Status."});
  }
}
module.exports ={ getUserApplication,getUserApplicationStats,getUserMonthlyStats,applyToJob,updateApplicationStatus };

  








