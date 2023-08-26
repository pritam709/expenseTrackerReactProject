import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

import { expenseActions } from "../store/expense";
import { themeActions } from "../store/theme";
import Papa from "papaparse";
import { saveAs } from "file-saver";
const Home = () => {
  const userId= useSelector(state=>state.auth.userId);
  const [features, setFeatures] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const expenses = useSelector((state) => state.expenses.expenseList);
  const dispatch = useDispatch();

  const totalExpense = expenses.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const amountChangeHandler = (event) => {
    const updatedAmt = +event.target.value;
    setAmount(updatedAmt);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      amount: amount,
      description: description,
      category: category,
    };

    addExpenseHandler(expenseData);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  useEffect(() => {
    const getExpense = async () => {
      const response = await fetch(
        "https://expensetracker-d0652-default-rtdb.firebaseio.com/"+userId+"/expense.json"
      );

      const resData = await response.json();

      const fetchResult = [];
      for (let key in resData) {
        fetchResult.unshift({
          ...resData[key],
          id: key,
        });
      }

      dispatch(expenseActions.onRestoreExpenses(fetchResult));
    };
    getExpense();
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const addExpenseHandler = (obj) => {
    dispatch(expenseActions.addExpense(obj));

    fetch(
      "https://expensetracker-d0652-default-rtdb.firebaseio.com/"+userId+"/expense.json",
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

  const changeThemeHandler = () => {
    dispatch(themeActions.changeTheme());
  };

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
  const showFeatures = () => {
    setFeatures(true);
  };

  const deleteExpenseHandler = (item) => {
    const id = item.id;
    fetch(
      "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense/" +
        id +
        ".json",
      {
        method: "DELETE",
      }
    ).then((res) => {
      console.log(res);

      dispatch(expenseActions.removeExpense(item));
    });
  };
  const editExpenseHandler = (item) => {
    const id = item.id;
    fetch(
      "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense/" +
        id +
        ".json",
      {
        method: "DELETE",
      }
    ).then((res) => {
      console.log(res);

      dispatch(expenseActions.removeExpense(item));
    });
    console.log(item);
    setAmount(item.amount);
    setDescription(item.description);
    setCategory(item.category);
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
      {totalExpense > 10000 ? (
        <div>
          <button className={classes.primiumBtn} onClick={showFeatures}>
            Activte Premium
          </button>{" "}
        </div>
      ) : null}

      {totalExpense > 10000 && features ? (
        <div>
          <button className={classes.primiumBtn} onClick={changeThemeHandler}>
            change Theme
          </button>{" "}
          <button
            className={classes.primiumBtn}
            onClick={dowloadExpenseExcelHandler}
          >
            Download Expenses
          </button>
        </div>
      ) : null}

      <div className={classes["new-expense"]}>
        {" "}
        <form onSubmit={submitHandler}>
          <div className={classes["new-expense__controls"]}>
            <div className={classes["new-expense__control"]}>
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={amountChangeHandler}
              />
            </div>
            <div className={classes["new-expense__control"]}>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={descriptionChangeHandler}
              />
            </div>
            <div className={classes["new-expense__control"]}>
              <label>Category</label>
              <select value={category} onChange={categoryChangeHandler}>
                <option>select one...</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Fuel</option>
                <option>Shopping</option>
              </select>
            </div>
          </div>
          <div className={classes["new-expense__actions"]}>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>

      <ul>
        {expenses.map((item) => {
          return (
            <li key={item.id}>
              {item.amount} &nbsp;
              {item.description}&nbsp;
              {item.category} &nbsp;
              <button onClick={deleteExpenseHandler.bind(null, item)}>
                Delete Expense
              </button>{" "}
              &nbsp;
              <button onClick={editExpenseHandler.bind(null, item)}>
                Edit Expense
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Home;
