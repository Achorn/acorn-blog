import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as AcornIcon } from "../../assets/icons/acorn.svg";
import AccountMenu from "../account-menu/AccountMenu";

const Nav = () => {
  return (
    <div className="Nav-container">
      <div className="Home-btn-container">
        <NavLink to={`/`} className="Home-btn-link">
          <AcornIcon className="Nav-icon" />
          <h2 className="Home-btn-txt">BLOG</h2>
        </NavLink>
      </div>
      <Account />
    </div>
  );
};

const Account = () => {
  const { user, loading } = useAuth();

  let account = (
    <div className="Logout-btn">
      <NavLink to={`/signin`}> sign In </NavLink>
    </div>
  );
  if (loading) account = <div className="Logout-btn"></div>;
  if (user) {
    account = <AccountMenu />;
  }

  return <div className="Acount-container">{account} </div>;
};

export default Nav;
