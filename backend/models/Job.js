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
status:{
  type:String,
  enum:["pending","interview","declined"],
  default:"pending"
},
jobType:{
  type:String,
  enum:["part-time","full-time","remote"],
  default:"full-time"
}
},{timestamps:true});

module.exports = mongoose.model("Job",JobSchema);