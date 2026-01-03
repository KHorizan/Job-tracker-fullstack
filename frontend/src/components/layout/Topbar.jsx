import "../../Styles/Topbar.css";

function Topbar({title}){
    return(
        <div className="topbar">
           <h2 className="page-title">{title}</h2>

           <div className="user-info">
            <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="avatar" />
            <span className="username">Kashish</span>
           </div>
        </div>
    );
}

export default Topbar;