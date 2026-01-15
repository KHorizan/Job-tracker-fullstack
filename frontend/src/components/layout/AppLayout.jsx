import{useState ,useEffect} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from"../layout/Sidebar";
import Topbar from"../layout/Topbar";
import {useAuth} from"../../context/AuthContext";
import "../../Styles/AppLayout.css";

function AppLayout(){
    const{user} = useAuth(); 
    const[isMobile,setIsMobile] = useState(false);
    const[isOpen,setIsOpen] = useState(true);


 useEffect(()=>{
    const handleResize=()=>{
        if(window.innerWidth<760){
            setIsMobile(true);
            setIsOpen(false);
        }else{
            setIsMobile(false);
            setIsOpen(true);
        }

    };

    handleResize();
    window.addEventListener("resize",handleResize);
    return ()=>window.removeEventListener("resize",handleResize);
 },[]);


 return(
    <div className="layout">
     <Sidebar
        role={user.role}
        isMobile={isMobile}
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
     />
    
<div className={`main ${isOpen && !isMobile ? "sidebar-open" : ""}`}>
        <Topbar 
        title="Dashboard"
        username= {user?.name||"User"}
        toggleSidebar={()=>setIsOpen(!isOpen)}/>
        <Outlet />
    </div>
    {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsOpen(false)}></div>
      )}
   </div>
 );

}
export default AppLayout;