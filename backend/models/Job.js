const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({

createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},
title:{
  type: String,
  required:true,
  trim:true
},
company:{
  type:String,
  required:true,
  trim:true
},
location: {
  type: String,
  required: true,
  trim: true,
},
jobType:{
  type:String,
  enum:["part-time","full-time","remote"],
  default:"full-time"
},
description: {
  type: String,
  default: "",
  },
 skills: {
  type: [String],
  default: [],
  },
  experience: {
  type: String,
  default: "",
  },
  salary: {
  type: String,
  default: "",
  },
  status: {
  type: String,
  enum: ["active", "closed"],
  default: "active"
},
},{timestamps:true});

module.exports = mongoose.model("Job",JobSchema);