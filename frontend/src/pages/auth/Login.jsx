import React,{useState} from "react";
import axios from "axios";
import "../../Styles/Login.css";

function Login(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[message,setMessage] =useState("");
    const[messageType ,setMessageType] =useState("")


 const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
    const res = await axios.post("http://localhost:5000/api/auth/login",{
            email,
            password,
        });

       localStorage.setItem("token", res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("User login successful");
        setMessageType("success");

        //reset
        setEmail("");
        setPassword("");

    }catch(err){
        setMessage("Unable to login!")
        setMessageType("error");

    }
 }
    return(
        <div className="login-container">
            <div className="login-card">
            <h2 className="title">Login</h2>

            <form  className="form" onSubmit={handleSubmit}>
                <input className="email" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input  className ="password" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <button className="btn" type="submit">Login</button>
            </form>

           <p className={`message ${messageType}`}>
                  {message}
                </p>
         </div>
        </div>
    )
};

export default Login;