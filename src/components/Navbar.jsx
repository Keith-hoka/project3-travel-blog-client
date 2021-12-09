import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import "./Navbar.css";

const Navbar = ({ user }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push("/")
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navbar-listItem">
        <img src="./images/travel.gif" alt="logo" />
      </div>
      <p>Double click on map to create your travel blog :)</p>
      <div className="navbar-listItem">
        <p className="navbar-welcome">Welcome! { user }</p>
        <Button className="navbar-btn" onClick={handleLogout} variant="outlined" endIcon={<LogoutIcon />}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
