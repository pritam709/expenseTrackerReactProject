import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log(localStorage.getItem("token"));
  };
  return (
    <>
    <Link to="/">
          {" "}
          <button className={classes.logBtn} onClick={logoutHandler}>
            Logout
          </button>
        </Link>
      <div className={classes.header}>
        
        <span>
          <i>Welcome to Expense Tracker!!!!</i>
        </span>{" "}
        <span>
          Your profile is incomplete. <Link to="/profile">Complete now</Link>
        </span>
      </div>
      <hr></hr>
    </>
  );
};
export default Home;
