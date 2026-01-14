import{useNavigate} from "react-router-dom";
import "../../Styles/ActionCard.css";

function ActionCard({title,description,button,to}){
    console.log("Action loaded"); 

    const navigate = useNavigate();
    return(
        <div className="action-container">
            <h2 className="title">{title}</h2>
            <p className="desc">{description}</p>
            <button className="action-btn" onClick={()=>navigate(to)}>{button}</button>

        </div>
    );
    
}
export default ActionCard;