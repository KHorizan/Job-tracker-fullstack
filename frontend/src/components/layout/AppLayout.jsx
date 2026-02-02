import{useState ,useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from"../layout/Sidebar";
import Topbar from"../layout/Topbar";
import {useAuth} from"../../context/AuthContext";
import "../../Styles/AppLayout.css";

function AppLayout(){
    const location = useLocation();
    const{user} = useAuth(); 
    const[isMobile,setIsMobile] = useState(false);
    const[isOpen,setIsOpen] = useState(true);

const getPageTitle=()=>{
      if (location.pathname === "/dashboard") return "Dashboard";
     if (location.pathname === "/jobs") return "Browse Jobs";
     if(location.pathname==="/applications") return "My Applications";
     if (location.pathname.startsWith("/jobs/")) return "Job Details";
      return "";
}
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
        title={getPageTitle()}
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