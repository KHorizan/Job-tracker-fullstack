import "../../Styles/Topbar.css";

function Topbar({ title, username, toggleSidebar }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span className="page-title">{title}</span>
      </div>
      <div className="user-info">
        <span className="username">{username}</span>
      </div>
    </div>
  );
}


export default Topbar;