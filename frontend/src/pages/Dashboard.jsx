import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatsCard from"../components/layout/StatsCard";
import Charts from "../components/layout/InterviewChart";
import ActionCard from"../components/layout/ActionCard";

import "../Styles/Dashboard.css";

function Dashboard(){
    return(
        <div className="dashboard-layout">
            <Sidebar />
            
            <div className="Page-title">
            <Topbar title="Dashboard" username="Kashish" /> 

            <div className="stats-container">
                <StatsCard title="Total Jobs" value={24} subtitle="Total jobs you have applied to"/>
                <StatsCard title="Attended" value={12} subtitle="Total interviews you have attende" />
                <StatsCard title="Pending" value={9}  subtitle="Applications that are still pending"/>
                <StatsCard title="Rejected" value={3} subtitle="Applications that were rejected" />
            </div>


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
        title="Seetings"
        description ="Customize your account preferences, notifications, and other options."
        button ="Update Setting"
        to="/settings"
        />
        </div>
        
            <Charts />

            </div>  
        </div>
    );
}

export default Dashboard;