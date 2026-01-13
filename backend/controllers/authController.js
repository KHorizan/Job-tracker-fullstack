const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
 //REGISTER
const register = async(req,res)=>{
  try{
    const {name,email,password} = req.body;

    //check if user already exists,
    const userExists = await User.findOne({email});
    if(userExists){
    return  res.status(400).json({message:"User already exists"});
  } 

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create User
    const user = await User.create({
        name,
        email,
        role:"jobseeker",
        password:hashedPassword
    });

    //generate token
    const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

  res.status(201).json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token});
} catch(err){
  console.error("REGISTER ERROR:", err); 
   res.status(500).json({ message: "Server error", error: err.message });
 }
};


//LOGIN
const login = async(req,res)=>{
    try{
 const{email,password} = req.body;

 //check if user exists 
 const user = await User.findOne({email});
 if(!user) return res.status(404).json({message:"User not found"});

const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch) return  res.status(400).json({ message: "Invalid credentials" });

//generate token
const token = jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
);
res.status(200).json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token});
}catch(err){
res.status(500).json({ message: "Server error", error: err.message });
}
};


//Get User's info
const getUser = async(req,res)=>{
try{
 const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);

}catch(err){
  res.status(500).json({ message: "Server error", error: err.message });
} 
};

//update user info
const updateUser = async(req,res)=>{
  try{
const{name,email,currentPassword,newPassword} = req.body;

const user = await User.findById(req.user.id);
if(!user) return res.status(404).json({message:"User not found"});

if(name) user.name= name;

if(email && email !==user.email){

  const emailExists = await User.findOne({email});
  if(emailExists) return res.status(400).json({message:"Email already in use"});

  user.email = email;
} 

if(newPassword){
  if(!currentPassword) {
    return res.status(400).json({message:"Current password is required to update Password."});
  }

  const isMatch = await bcrypt.compare(currentPassword,user.password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid credentials."});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword,salt);
  user.password = hashedPassword;
}
await user.save();
 res.status(200).json({message:"User updated successfully ",
  user:{
    id:user._id,
    name:user.name,
    email:user.email
  }
 });

  }catch(err){
res.status(500).json({ message: "Server error", error: err.message });
  }
};
  //DELETE USER
  const deleteUser = async(req,res)=>{
    try{
   await User.findByIdAndDelete(req.user.id);
   res.status(200).json({message:"User deleted succesfully"});
    }catch(err){
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  module.exports = {register,login,getUser,updateUser,deleteUser};