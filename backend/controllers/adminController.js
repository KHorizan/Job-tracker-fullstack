const User = require("../models/User");

//get all users 
const getAllUsers=async(req,res)=>{
    try{
const users = await User.find().select("name,email,role,createdAt,updatedAt");
 res.status(200).json(users);

}catch(err){
  res.status(500).json({ message: "Server error", error: err.message });
    }
};

//Update role
const UpdateUserRole = async(req,res)=>{
    try{
        const{userId,role} = req.body;

      const allowedroles = ["jobseeker","employer","admin"];
      if(!allowedroles.includes(role)) {
        return res.status(400).json({message:"Invalid role"});
      }  
        //check if user exists
        const user = await User.findById(userId);
     if(!user) return res.status(404).json({ message: "User not found" });

     user.role= role;
     await user.save(); 

    res.status(200).json({message:"User role updated successfully",
        user:{
            id:user._id,
            role:user.role,
            email:user.email,
        },
    });
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
};

module.exports = { UpdateUserRole,getAllUsers };
