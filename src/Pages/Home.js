import React from "react";
import classes from "./Home.module.css"
import { Link } from "react-router-dom";
const Home=()=>{
    return <>
        <div className={classes.header}><span><i>Welcome to Expense Tracker!!!!</i></span> <span>Your profile is incomplete. <Link to="/profile">Complete now</Link></span></div>
        <hr></hr>
    </>
}
export default Home;