import{useState} from "react";
import{ LineChart,XAxis,YAxis,Tooltip,Legend,Line} from "recharts";
import"../../Styles/InterviewChart.css";

function Charts(){
    const[showAttended ,setShowAttended] =useState(true);
    const[showPending ,setShowPending] = useState(true);
    const[showRejected,setShowRejected] = useState(false);

const InterviewData=[
    { month: "Jan", attended: 20, pending: 15, rejected: 5 },
    { month: "Feb", attended: 3, pending: 2, rejected: 1 },
    { month: "Mar", attended: 5, pending: 1, rejected: 2 },
    { month: "Apr", attended: 4, pending: 3, rejected: 1 },
    { month: "May", attended: 3, pending: 2, rejected: 1 },
    { month: "June", attended: 4, pending: 2, rejected: 2 },
    { month: "July", attended: 15, pending: 3, rejected: 12 },
    { month: "Aug", attended: 4, pending: 3, rejected: 1 },
    { month: "Sep", attended: 3, pending: 2, rejected: 1 },
    { month: "Oct", attended: 4, pending: 2, rejected: 2 },
    { month: "Nov", attended: 15, pending: 3, rejected: 12 },
]

return(
    <div className="chart-container">
        <div className="buttons-container">
       <h2 className="chart-title">Interview Statistics</h2>

    <div className="toggle-buttons">
      <button className={showAttended?"active":""} 
       onClick={()=>setShowAttended(!showAttended)}>
           Attended
       </button>

      <button className={showPending?"active":""} 
       onClick={()=>setShowPending(!showPending)}>
           Pending
       </button>

       <button className={showRejected?"active":""} 
       onClick={()=>setShowRejected(!showRejected)}>
          Rejected
       </button>
    </div>
    </div>


    <LineChart width={900} height={400} data={InterviewData}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />

{showAttended &&(
  <Line 
 type="monotone"
 dataKey="attended"
  stroke="#7c3aed"
 strokeWidth={2} 
 />  
)}

{showPending &&(
    <Line
    type="monotone"
    dataKey="pending"
    stroke="#16a34a"
    strokeWidth={2}
    />

)}

{showRejected &&(
    <Line 
    type="monotone"
    dataKey="rejected"
    stroke= "#dc2626"
    strokeWidth={2}
    />
)}

</LineChart>
 </div>
);
}

export default Charts;