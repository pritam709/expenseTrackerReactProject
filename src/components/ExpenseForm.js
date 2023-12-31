import React, {  useState } from 'react';

import classes from './ExpenseForm.module.css';
import { useSelector } from 'react-redux';

const ExpenseForm = (props) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

 const editExpense= useSelector(state=>state.expenses.editExpense);
 if(editExpense){
  setAmount(editExpense.amount);
  setCategory(editExpense.category);
  setDescription(editExpense.description);

 }
 
  
 

  const amountChangeHandler = (event) => {
    const updatedAmt=+event.target.value
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

    props.onSaveExpenseData(expenseData);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className={classes['new-expense']}> <form onSubmit={submitHandler}>
      <div className={classes['new-expense__controls']}>
        <div className={classes['new-expense__control']}>
          <label>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={classes['new-expense__control']}>
          <label>Description</label>
          <input
            type='text'
            
            value={description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={classes['new-expense__control']}>
          <label>Category</label>
          <select
           
            value={category}
            onChange={categoryChangeHandler}
          >
          <option>select one...</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Fuel</option>
            <option>Shopping</option>
          </select>
        </div>
      </div>
      <div className={classes['new-expense__actions']}>
    
        <button type='submit'>Add Expense</button>
      </div>
    </form>
</div>
   
  );
};

export default ExpenseForm;
