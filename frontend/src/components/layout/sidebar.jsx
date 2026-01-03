import "../../Styles/Sidebar.css";


function Sidebar(){
    return (
        <div className="sidebar">
            <h2 className="logo">Job-Tracker</h2>

          <ul className="nav-links">
            <li className="active">Dashboard</li>
            <li>Jobs</li>
            <li>Stats</li>
            <li>Profile</li>
          </ul>
        </div>
    );
}
export default Sidebar;