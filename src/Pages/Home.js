import React, { useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";
const Home = () => {
  const[expenses,setExpenses]=  useState([])
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log(localStorage.getItem("token"));
  };

  const addExpenseHandler=(obj)=>{
    console.log(obj);
        setExpenses(prevState=>{
        return [...prevState,obj]
    })
  }
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
      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
      <Expenses items={expenses} />
    </>
   
  );
};
export default Home;
