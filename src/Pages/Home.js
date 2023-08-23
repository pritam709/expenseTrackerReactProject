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
import Papa from "papaparse";
import { saveAs } from "file-saver";
const Home = () => {
  const [features, setFeatures] = useState(false);
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

  const dowloadExpenseExcelHandler = () => {
    // Convert data to CSV format
    const data = [];
    expenses.forEach((val) => {
      const ExpenseAmount = val.amount;
      
      const Category = val.category;
      const Description = val.description;

      data.push({ ExpenseAmount, Category, Description });
    });
    console.log("data", data);
    const csv = Papa.unparse(data);

    // Convert CSV data into a Blob
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the CSV file using FileSaver
    saveAs(csvBlob, "Expensedata.csv");

    // setActivePremium(false);
  };
  const showFeatures=()=>{

    setFeatures(true);

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
      {totalExpense>10000 ? <div><button className={classes.primiumBtn} onClick={showFeatures}>Activte Premium</button> </div> : null}

      {(totalExpense>10000 && features) ? <div><button className={classes.primiumBtn} onClick={changeThemeHandler}>change Theme</button> <button  className={classes.primiumBtn} onClick={dowloadExpenseExcelHandler}>Download Expenses</button></div> : null}

      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
      <Expenses
        items={expenses}
      
       
      />
    </>
  );
};
export default Home;
