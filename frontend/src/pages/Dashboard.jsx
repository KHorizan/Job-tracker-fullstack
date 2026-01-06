import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatsCard from"../components/layout/StatsCard";
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

            </div>  
        </div>
    );
}

export default Dashboard;