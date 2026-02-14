const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const getEmployerDashboardStats = async(req,res)=>{
    try{
    
    const employerId = req.user.id;
    const jobs = await Job.find({createdBy:employerId},"_id status");

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job=>job.status === "active").length;

   const jobIds = jobs.map(job=>job._id);
   const totalApplications = await Application.countDocuments({job:{$in:jobIds}});
  
   const last7days = new Date();
    last7days.setDate(last7days.getDate()-7);

   const recentApplications = await Application.countDocuments({
    job:{$in:jobIds}
    ,createdAt:{$gte:last7days}
 });

    res.status(200).json({
        totalJobs,
        activeJobs,
        totalApplications,
        recentApplications
    })
  }catch(err){
    res.status(500).json({message:"Server error"});
}
};

const getApplicationsOverTime = async(req,res)=>{
    try{
       const employerId = req.user.id;

        const jobs = await Job.find({createdBy:employerId},"_id");
        const jobIds = jobs.map(job=>job._id);

        const applications = await Application.aggregate([
            {$match: {job:{$in:jobIds}}},
            {$group:{
               _id: {
                $dateToString:{
                    format:"%Y-%m-%d",
                    date:"$createdAt"
                }
               },
             count:{$sum:1}
            }},
            
            {$sort:{_id:1}}
        ]);

        const data = applications.map(d=>({
            date:d._id,
            count:d.count
        }));

    res.status(200).json(data);
 }catch(err){
        res.status(500).json({message:"server error"});
    }
};

const getRecentActivity = async(req,res)=>{
    try{
  
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||7;
    const skip = (page-1)*limit;

    const employerId = req.user.id;

    const jobs = await Job.find({createdBy:employerId});
    const jobIds = jobs.map(job=>job._id);

    //New job posted
     const jobActivites = jobs.map(job=>({
        type:"job-posted",
        jobTitle :job.title,
        timestamp :job.createdAt
    }));


    //new applications 
   const applications = await Application.find({
            job:{$in:jobIds}})
            .populate("user","name")
            .populate("job","title")
            .sort({createdAt:-1})

    const applicationActivities = applications.map(app=>({
          type:"new_application",
          candidate : app.user.name,
          jobTitle : app.job.title,
          timestamp :app.createdAt
    }));


  //status Changes 
  const statusChanges =  await Application.find({
    job:{$in:jobIds},
    statusUpdatedAt:{$exists:true}
   })
    .populate("user","name")
    .populate("job","title")
    .sort({statusUpdatedAt:-1})
    
 const statusActivities = statusChanges.map(app=>({
    type:"status_changed",
    candidate:app.user.name,
    jobTitle:app.job.title,
    status:app.status,
    timestamp:app.statusUpdatedAt
 }));
                       
 //combine all
 const allActivities = [
    ...jobActivites,
    ...applicationActivities,
    ...statusActivities
 ];

 //sort 
 allActivities.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    
//pagination after sorting
const paginatedActivities = allActivities.slice(skip, skip + limit);
 res.status(200).json({
      total: allActivities.length,
      page,
      limit,
      activities: paginatedActivities
    });
}catch(err){
   res.status(500).json({message:"server error"});   
    }
};

const getTopCandidates = async(req,res)=>{
    try{

 const employerId = req.user.id;
 const jobs = await Job.find({createdBy:employerId}).select("_id");
 const jobIds = jobs.map(job=>job._id);

const applications = await Application.find({
    job:{$in:jobIds},
    status:{$in:["interview"]}
})
 .populate("user","name email")
 .populate("job","title")
 .sort({statusUpdatedAt:-1})
 .limit(5); 

const topcandidates = applications.map(app=>({
    candidate : app.user.name,
    email : app.user.email,
    jobTitle:app.job.title,
    status:app.status
}));

res.status(200).json({
    count:topcandidates.length,
    candidates:topcandidates

});

}catch(err){
        res.status(500).json({message:"Unable"})
    }
};

module.exports={getEmployerDashboardStats,getApplicationsOverTime,getRecentActivity,getTopCandidates};








































