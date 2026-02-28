import {useState,useEffect} from "react";
import StatsCard from  "../../components/cards/StatsCard";
import RecentActivity from "../../components/cards/RecentActivity";
import ApplicationsOverTime from "../../components/charts/ApplicationOverTime";
import TopCandidatesCard from  "../../components/cards/TopCandidatesCard"; 
import "../../Styles/EmployerDashboard.css";

function EmployerDashboard(){
 const[stats ,setStats] = useState({
    totalJobs:20,
    activeJobs:10,
    totalApplications:150,
    newApplications :45
    
 })
 const [chartData ,setChartData] = useState([
    { "date": "2026-02-01", "count": 12 },
   { "date": "2026-02-02", "count": 20 },
  { "date": "2026-02-03", "count": 8 },
  { "date": "2026-02-04", "count": 12 },
   { "date": "2026-02-05", "count": 20 },
  { "date": "2026-02-06", "count": 8 },
   { "date": "2026-02-07", "count": 12 },

  
 ]);

 const [recentActivity,setRecentActivity] = useState([
    {
    type: "application",
    candidate: "John Doe",
    jobTitle: "Software Engineer",
    timestamp: "2026-02-10T08:30:00Z",
    status: "applied"
  },
  {
    type: "status",
    jobTitle: "Backend Developer",
    timestamp: "2026-02-09T14:20:00Z",
    status: "closed"
  },
  {
    type: "message",
    candidate: "Alex Johnson",
    timestamp: "2026-02-10T09:00:00Z",
    message: "You have a new message"
  }
 ])


 const {
    totalJobs=20,
    activeJobs=10,
    totalApplications=150,
    newApplications=45
 } = stats;

 
    return(
        <div className="dashboard-container employer-dashboard">

               <div className="stats-container">
             <StatsCard title="Total Jobs" value={totalJobs} subtitle="Total Jobs posted."/>
             <StatsCard title="Active Jobs" value={activeJobs} subtitle="Currently open jobs."/>
             <StatsCard title="Total Applications" value={totalApplications} subtitle="All applications received." />
             <StatsCard title="New Applications" value={newApplications} subtitle="Last 7 days."/>

            </div>

            <div className="chart-container">
                <div className="chart-title">
                    <ApplicationsOverTime data={chartData}/>
                </div>
               
            </div>


<div className="dashboard-main">

{/* left section */}
<div className="left-section">
   <RecentActivity activites={recentActivity}/>
  </div>

<div className="right-section">
  <TopCandidatesCard />
</div>






</div>




        </div>
    )
}
export default EmployerDashboard;
