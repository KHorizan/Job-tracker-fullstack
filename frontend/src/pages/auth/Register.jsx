import React, {useState} from "react";
import axios from "axios";
import "../../Styles/Register.css";


function Register(){
    const [username,setUsername]= useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[message,setMessage] = useState("");
    const[messageType,setMessageType] =useState("");


const handleSubmit= async(e)=> {
       e.preventDefault();

try{
  const res= await  axios.post("http://localhost:5000/api/auth/register",{
       
         name:username,
         email,
         password 
    });  

 setMessage(res.data.message||"User registered seccesfully!");
 setMessageType("success");
   if (res.data.token) {
    localStorage.setItem("token", res.data.token);
      }

  
 //reset
 setUsername("");
 setEmail("");
 setPassword("");
}catch(err){
    console.log(err.response); 
   setMessage(err.response?.data?.message || "Unable to register!");
   setMessageType("error");
}
};
    return(

        <div className="register-container">
            <div className="register-card" >
            <h2 className="title">Register</h2>
        
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your username..." value={username} onChange={(e)=>setUsername(e.target.value)}  required />
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required  />


            <button type="submit">Register</button>
         </form>

           <p className={`message ${messageType}`}>
                  {message}
                </p>
         </div>
        </div>
    );
}
export default Register;