import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as AcornIcon } from "../../assets/icons/acorn.svg";

const Nav = () => {
  return (
    <div className="Nav-container">
      <NavLink to={`/`} className="Home-btn-container">
        <AcornIcon className="Nav-icon" />
        <h2 className="Home-btn-txt"> BLOG</h2>
      </NavLink>

      <Account />
    </div>
  );
};

const Account = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut()
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  let account = (
    <div>
      <NavLink to={`/signin`}> sign In </NavLink>
    </div>
  );
  if (user) {
    account = (
      <div className="User-logout-container">
        <div>{user.email}</div>
        <button className="Logout-btn" onClick={handleLogout}>
          logout
        </button>
      </div>
    );
  }

  return <div className="Nav-bar">{account}</div>;
};

export default Nav;
