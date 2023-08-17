import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";
const Home = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const getExpense = async () => {
      const response = await fetch(
        "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense.json"
      );

      const resData =await response.json();
      console.log(resData);
      const fetchResult=[];
      for(let key in resData){
        fetchResult.unshift(
            {
                ...resData[key],
                id:key
            }
        )
      }
      console.log(fetchResult);
      setExpenses(fetchResult);
     
    };
    getExpense();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log(localStorage.getItem("token"));
  };

  const addExpenseHandler = (obj) => {
    console.log(obj);
    setExpenses((prevState) => {
      return [...prevState, obj];
    });
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
