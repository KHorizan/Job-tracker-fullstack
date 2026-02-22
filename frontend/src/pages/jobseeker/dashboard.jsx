import StatsCard from "../../components/cards/StatsCard";
import Charts from "../../components/charts/InterviewChart";
import ActionCard from"../../components/cards/ActionCard.jsx";
import ApplicationTableBase from "../../components/tables/ApplicationsTable/ApplicationTableBase"
import ApplicationRow from "../../components/tables/ApplicationsTable/ApplicationRow";
import ApplicationEmptyState from "../../components/tables/ApplicationsTable/ApplicationEmptyState";
import { useAuth } from "../../context/AuthContext";
import "../../Styles/Dashboard.css";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function Dashboard(){
  const navigate = useNavigate();
  const { user } = useAuth();

const[applications,setApplications] = useState([]);
 const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    interview: 0,
    rejected: 0,
  });
  const [chartData, setChartData] = useState([]);
  const[loading,setLoading] = useState(true);


  const COLUMN_MAP_DASHBOARD ={
   "Company": "job.company",
   "Job Title": "job.title",
    "Status": "status",
    "Applied On": "appliedOn",           
  };

  useEffect(()=>{
     const fetchApplications =async()=>{
      try{
       setLoading(true);

        const [appsRes, statsRes, monthlyRes] = await Promise.all([
        api.get(`/applications?limit=10`),
        api.get("/applications/stats"),    
        api.get("/applications/monthly-stats"),
  ]);
      
       setApplications(appsRes.data.applications || []);
        setStats(statsRes.data || { total: 0, pending: 0, interview: 0, rejected: 0 });
        setChartData(monthlyRes.data || [])
      }catch(err){
       console.error("Error fetching dashboard data:", err);
      }finally{
        setLoading(false);
      }
    };
    fetchApplications();

  },[]);

   if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }
    

const { total = 0, pending = 0, interview = 0, rejected = 0 } = stats;

 return(
    <div className="dashboard-layout">
     <div className="Page-title">

      <div className="stats-container">
        <StatsCard title="Total Jobs" value={total} subtitle="Total jobs you have applied to"/>
        <StatsCard title="Interview" value={interview} subtitle="Total interviews you have attended" />
        <StatsCard title="Pending" value={pending}  subtitle="Applications that are still pending"/>
        <StatsCard title="Rejected" value={rejected} subtitle="Applications that were rejected" />
      </div>
         
        {chartData && chartData.length > 0 ? (
          <div className="chart-section">
            <Charts data={chartData} />
          </div>
        ) : (
          <div className="chart-placeholder">
            <p>No interview data yet.</p>
            <p>Apply to jobs to see statistics!</p>
          </div>
        )}
            

        <div className="actionCard-layout">
        <ActionCard 
        title="Add a Job"
        description ="Quickly add a new job you’re interested in tracking."
        button ="Add Job"
        to="/add-job"
        />

        <ActionCard 
        title="View Jobs"
        description ="Browse all available jobs and find the ones that match your profile"
        button ="View Jobs"
        to="/jobs"
        />
        <ActionCard 
        title="Update profile"
        description ="Edit your personal information, contact details, and account settings."
        button ="Edit Profile"
        to="/profile"
        />
        <ActionCard 
        title="Settings"
        description ="Customize your account preferences, notifications, and other options."
        button ="Update Setting"
        to="/settings"
        />
        </div>

        
      {/* Recent Applications Table */}
    
   <div className="recent-applications"> 
  <h3>Recent Applications</h3>

  {applications.length > 0 ? (
    <>
      <ApplicationTableBase columns={["Company", "Job Title", "Status", "Applied On"]}>
        {applications.slice(0, 10).map((app) => (
         <ApplicationRow
          key={app._id} 
          application={app} 
          columns={["Company", "Job Title", "Status", "Applied On"]}
          columnMap={COLUMN_MAP_DASHBOARD}
          variant="compact" />
        ))}
      </ApplicationTableBase>

      {/* CTA below table */}
      <div className="table-cta">
        <button onClick={() => navigate("/applications")}>
          View All Applications
        </button>
      </div>
    </>
  ) : (
    <ApplicationEmptyState message="No recent applications to show." />
  )}
</div>

        </div>  
        </div>
    );
}

export default Dashboard;



