import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaUserPlus, FaEnvelope, FaBriefcase } from "react-icons/fa";
import "../../Styles/RecentActivity.css";


dayjs.extend(relativeTime);

function RecentActivity({activites}){
    if(!activites ||activites.length===0) {
        return <p>No recent Activity.</p>
    }

    return(
        <div className="activities-container">
            
                <h2>Recent Activites</h2>

            {activites.map((activity,index)=>{
                let icon,text ;

            switch(activity.type){
             case "application":
             icon = <FaUserPlus />;
             text = `${activity.candidate} applied for ${activity.jobTitle}`;
             break;

            case "status":
            icon = <FaBriefcase />
            text =`${activity.jobTitle} job was ${activity.status}`  
            break;

            case "message":
            icon= <FaEnvelope />
            text =`You sent a message to ${activity.candidate}`
            break;

            default:
            icon=null;
            text="Unknown activity";
            }
     return (
        <div key={index} className="acitivity-item"> 
            {icon}
            <div> 
                <p>{text}</p>
                <small>{dayjs(activity.timestamp).fromNow()}</small>
            </div>
        </div>
     );
 })}
 </div>
);

}
export default RecentActivity;