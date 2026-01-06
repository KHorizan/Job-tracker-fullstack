import "../../Styles/Topbar.css";

function Topbar({title,username}){
    return(
        <div className="topbar">
           <h2 className="page-title">{title}</h2>

           <div className="user-info">
            <span className="username">{username}</span>
           </div>
        </div>
    );
}

export default Topbar;