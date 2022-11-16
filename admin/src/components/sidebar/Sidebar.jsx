import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Book from "@mui/icons-material/Book"
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Swal from 'sweetalert2'
const handleLogout = () => {
  Swal.fire({
    title: 'Do you want to logout?',
   
    showCancelButton: true,
    confirmButtonText: 'Yes',
  
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
     
    }
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
  
      window.location.replace('/login');
    } else if (result.isDenied) {
      
    }
  })
  

};
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{color:"#2563eb",fontWeight:"bolder",fontSize:"1.5rem"}}>Incubation</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          
  
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon style={{color:"#2563eb"}} />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/applications" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon style={{color:"#2563eb"}} />
              <span>Applications</span>
            </li>
          </Link>
          <Link to="/book" style={{ textDecoration: "none" }}>
            <li>
              <Book style={{color:"#2563eb"}} />
              <span>Book slots</span>
            </li>
          </Link>
         
          <li onClick={()=>{handleLogout()}}>
            <ExitToAppIcon  style={{color:"#2563eb"}} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    
    </div>
  );
};

export default Sidebar;
