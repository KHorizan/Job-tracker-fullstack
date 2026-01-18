import "../../../Styles/StatusBadge.css";

function StatusBadge({status}){
    const formatStatus = status.charAt(0).toUpperCase()+status.slice(1);
    return(
        <span className={`badge-container ${status.toLowerCase()}`}>
         {formatStatus}
        </span>
    )
};

export default StatusBadge;
