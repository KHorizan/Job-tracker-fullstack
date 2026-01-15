import "../../Styles/Sidebar.css";
import sidebarMenu from"../../config/menu";
import{NavLink} from"react-router-dom";


function Sidebar({role,isMobile,isOpen,onClose}){
  const items = sidebarMenu[role]||[];
    return (
        <div className={`sidebar ${isMobile? "mobile":"desktop"}  ${ isOpen ?"open":"closed"}`}>
            <h2 className="logo">Job-Tracker</h2>

          <ul className="nav-links">
            {items.map((item)=>(
              <li key={item.link}>
            <NavLink  to={item.link} 
            className={({isActive}) => (isActive?"active":"")}
            onClick={isMobile?onClose:undefined}>
              
              {item.name}
            </NavLink>
              </li>
            ))}
           
          </ul>
        </div>
  
    );
}
export default Sidebar;