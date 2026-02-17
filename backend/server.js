const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const serverTimeLogger = require("./middleware/serverTimeLogger");

dotenv.config();
connectRedis();

connectDB();
const app = express();
app.use(serverTimeLogger);

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/applications", applicationRoutes);


app.get("/",(req,res)=>{
    res.send("Backend is working")
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server running on port  ${PORT}`)
});

