const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/admin",adminRoutes);


app.get("/",(req,res)=>{
    res.send("Backend is working")
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server running on port  ${PORT}`)
});

