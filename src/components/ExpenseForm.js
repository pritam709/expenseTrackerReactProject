import React, {  useState } from 'react';

import classes from './ExpenseForm.module.css';

const ExpenseForm = (props) => {
 
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // useEffect(()=>{
  //   const itemObj= props.onEdit;
  //   console.log(itemObj);
  //   // setAmount(props.onEdit.amount);
  //   // setDescription(props.onEdit.description);
  //   // setCategory(props.onEdit.category);
  // },[])
  

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
    
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
        {/* <button type="button" onClick={props.onCancel}>Cancel</button> */}
        <button type='submit'>Add Expense</button>
      </div>
    </form>
</div>
   
  );
};

export default ExpenseForm;
