const Job = require("../models/Job");

const createJob = async(req,res)=>{
 try{
   const{title,company,status,jobType} = req.body;

   if(!title||!company){
    return res.status(400).json({message:"Title and Company are required"});
   }
 const job= await Job.create({
    createdBy:req.user.id,
    title,
    company,
    status,
    jobType
   });
   res.status(201).json(job);
 }catch(err){
res.status(500).json({ message: "Server error", error: err.message });
}
};

//get all jobs of logged-in user
const getJobs = async(req,res)=>{
    try{
   const jobs = await Job.find({createdBy:req.user.id}).select("-createdBy").sort({createdAt:-1});
    res.status(200).json(jobs);
  }catch(err){
  res.status(500).json({ message: "Server error", error: err.message });
    }
};

//update job

const updateJob = async(req,res)=>{
    try{
  const{id} = req.params;
  const{title,company,status,jobType} = req.body;

  const job = await Job.findOne({_id:id,createdBy:req.user.id});
  if(!job) return res.status(404).json({message:"Job not found"});

 if(title) job.title = title;
 if(company) job.company = company;
 if(status) job.status=status;
 if(jobType) job.jobType = jobType;

 await job.save();

 const updatedJob = await Job.findById(job._id).select("-createdBy");

 res.status(200).json(updatedJob);
}catch(err){
  res.status(500).json({ message: "Server error", error: err.message });      
 }
};

//Delete job
const deleteJob = async(req,res)=>{
    try{
  const {id} = req.params;
  const job = await Job.findOneAndDelete({_id:id,createdBy:req.user.id});
  if (!job) return res.status(404).json({ message: "Job not found" });

  res.status(200).json({ message: "Job deleted successfully" });
    }catch(err){
    res.status(500).json({ message: "Server error", error: err.message });      
 }  
 };

module.exports = { createJob, getJobs, updateJob, deleteJob };