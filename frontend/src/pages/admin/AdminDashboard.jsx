import JobsBarChart from "../../components/charts/JobsBarChart";
import ApplicationsPieChart from "../../components/charts/ApplicationsPieChart";
import StatsCard from "../../components/cards/StatsCard";
import RecentActivity from "../../components/cards/AdminRecentActivity";
import QuickActions from "../../components/cards/QuickActions";
import "../../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const jobsData = [
    { month: "Jan", jobs: 12 },
    { month: "Feb", jobs: 18 },
    { month: "Mar", jobs: 10 },
    { month: "Apr", jobs: 22 },
    { month: "May", jobs: 15 },
  ];

  const applicationData = [
    { name: "Pending", value: 400 },
    { name: "Interview", value: 300 },
    { name: "Rejected", value: 200 },
    { name: "Hired", value: 100 },
  ];

  const recentData = [
    {
      jobTitle: "Frontend Developer",
      employer: "Tech Corp",
      candidate: "John Doe",
      status: "Pending",
    },
    {
      jobTitle: "Backend Engineer",
      employer: "Innovate Ltd",
      candidate: "Jane Smith",
      status: "Interview",
    },
  ];

  return (
<div className="admin-dashboard">

  <div className="stats-row">
    <StatsCard title="Total Jobs" subtitle="Total jobs posted" />
    <StatsCard title="Active Jobs" subtitle="Currently open jobs" />
    <StatsCard title="Total Applications" subtitle="All applications received" />
    <StatsCard title="New Applications" subtitle="Last 7 days" />
  </div>

 <div className="main-layout">

  <div className="left-column">

    <div className="dashboard-card chart-container">
      <JobsBarChart data={jobsData} />
    </div>

    <RecentActivity data={recentData} />

  </div>

  <div className="right-column">

    <div className="dashboard-card chart-container">
      <ApplicationsPieChart data={applicationData} />
    </div>

    <QuickActions />

  </div>

</div>
 
</div>




  );
};

export default AdminDashboard;