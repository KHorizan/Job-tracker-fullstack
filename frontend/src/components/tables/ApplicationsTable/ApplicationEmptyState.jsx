import "../../../Styles/ApplicationEmptyState.css";
function ApplicationEmptyState({message}){
    return(
        <p className="empty-state">{message}</p>
    )
};
export default ApplicationEmptyState;