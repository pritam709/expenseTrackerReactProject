import React from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";
const Expenses =(props)=>{
    const dispatch= useDispatch();
    const deleteExpenseHandler = (item) => {
        const id= item.id;
        fetch(
          "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense/" +
            id +
            ".json",
          {
            method: "DELETE",
          }
        ).then((res) => {
          console.log(res);
    
          // const newExpense = expenses.filter((item) => item.id !== id);
          // console.log(newExpense);
          // setExpenses(newExpense);
    
          dispatch(expenseActions.removeExpense(item))
        });
      };
    const editExpenseHandler=(item)=>{
        // const id= item.id;
        // fetch(
        //   "https://expensetracker-d0652-default-rtdb.firebaseio.com/expense/" +
        //     id +
        //     ".json",
        //   {
        //     method: "DELETE",
        //   }
        // ).then((res) => {
        //   console.log(res);
        //   dispatch(expenseActions.editExpense(item))
        //   dispatch(expenseActions.removeExpense(item))
        // });
    console.log(item);

       
    }
    return <ul>
        {props.items.map(item=>{
            return <li key={item.id}>
                {item.amount} &nbsp;
                {item.description}&nbsp;
                {item.category} &nbsp;
                <button onClick={deleteExpenseHandler.bind(null,item)}>Delete Expense</button> &nbsp;
                <button onClick={editExpenseHandler.bind(null,item)}>Edit Expense</button>
            </li>
        })}
    </ul>
}

export default Expenses;