import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as AcornIcon } from "../../assets/icons/acorn.svg";

const Nav = () => {
  return (
    <div className="Nav-container">
      <div className="Home-btn-container">
        <NavLink to={`/`} className="Home-btn-link">
          <AcornIcon className="Nav-icon" />
          <h2 className="Home-btn-txt"> BLOG</h2>
        </NavLink>
      </div>
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
    <div className="Logout-btn">
      <NavLink to={`/signin`}> sign In </NavLink>
    </div>
  );
  if (user) {
    account = (
      <div className="Acount-container">
        <div className="Email">{user.email}</div>
        <button className="Logout-btn" onClick={handleLogout}>
          logout
        </button>
      </div>
    );
  }

  return <div className="Acount-container">{account}</div>;
};

export default Nav;
