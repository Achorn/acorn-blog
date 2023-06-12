import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  return (
    <div>
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
        <p>{user.email}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div className="Nav-bar">
      <NavLink to={`/`}> Acorn Blog </NavLink>
      {account}
    </div>
  );
};

export default Nav;
