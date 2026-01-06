import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatsCard from"../components/layout/StatsCard";
import Charts from "../components/layout/InterviewChart";
import "../Styles/Dashboard.css";

function Dashboard(){
    return(
        <div className="dashboard-layout">
            <Sidebar />
            
            <div className="Page-title">
            <Topbar title="Dashboard" username="Kashish" /> 

            <div className="stats-container">
                <StatsCard title="Attended" value={12} className="purple" />
                <StatsCard title="Pending" value={9} className="green" />
                <StatsCard title="Rejected" value={3} className="red" />
            </div>

            <Charts />

            </div>  
        </div>
    );
}

export default Dashboard;