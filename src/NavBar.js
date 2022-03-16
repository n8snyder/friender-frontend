import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./userContext";

/** Navigation Bar
 * 
 * props: 
 * - logOut: function to log out user
 * 
 * state: none
 * 
 * App -> NavBar 
 */

function NavBar({ logOut }) {
  const { userId } = useContext(UserContext);
  return (
    <nav className="NavBar">
      <div className="NavBar-nav">
        <Link to="/">
          Friender
        </Link>
      </div>
      {userId &&
        <div className="NavBar-main-nav">
          {/* <NavLink exact to="/companies">
            Companies
          </NavLink>
          <NavLink exact to="/jobs">
            Jobs
          </NavLink>
          <NavLink exact to="/profile">
            Profile
          </NavLink> */}
          <Link to="/" onClick={logOut}>
            Logout
          </Link>
        </div>}
      {!userId &&
        <div className="NavBar-main-nav">
          <NavLink exact to="/login">
            Login
          </NavLink>
          <NavLink exact to="/signup">
            Sign Up
          </NavLink>
        </div>}
    </nav>
  );
}

export default NavBar;