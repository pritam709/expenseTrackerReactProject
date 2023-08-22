import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
// import expense from "../store/expense";
import { expenseActions } from "../store/expense";
import {themeActions }from "../store/theme";
const Home = () => {
  const expenses= useSelector(state=>state.expenses.expenseList);
  const totalExpense = expenses.reduce((curr,item)=>{
  
    return curr+item.amount;
  },0)
  console.log(totalExpense);
  // console.log(expenses);
  const dispatch= useDispatch();
  // const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    const getExpense = async () => {
      const response = await fetch(
        "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense.json"
      );

      const resData = await response.json();
      // console.log(resData);
      const fetchResult = [];
      for (let key in resData) {
        fetchResult.unshift({
          ...resData[key],
          id: key,
        });
      }
      // console.log(fetchResult);
      dispatch(expenseActions.onRestoreExpenses(fetchResult));
      // setExpenses(fetchResult);
    };
    getExpense();
  }, []);

  const logoutHandler = () => {

    dispatch(authActions.logout());

    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // console.log(localStorage.getItem("token"));
  };

  const addExpenseHandler = (obj) => {
    console.log(obj);
    // setExpenses((prevState) => {
    //   return [...prevState, obj];
    // });

    dispatch(expenseActions.addExpense(obj));

    fetch(
      "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const changeThemeHandler=()=>{

    dispatch(themeActions.changeTheme())

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
      {totalExpense>10000 ? <button className={classes.primiumBtn} onClick={changeThemeHandler}>Activate Premium</button> : null}

      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
      <Expenses
        items={expenses}
      
       
      />
    </>
  );
};
export default Home;
