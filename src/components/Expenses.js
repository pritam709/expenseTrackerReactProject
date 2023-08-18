import React from "react";
const Expenses =(props)=>{
    const deleteExpenseHandler=(id)=>{
      props.onDelete(id)
    }
    const editExpenseHandler=(id)=>{
        props.onEdit(id);
    }
    return <ul>
        {props.items.map(item=>{
            return<li key={item.id}>
                {item.amount} &nbsp;
                {item.description}&nbsp;
                {item.category} &nbsp;
                <button onClick={deleteExpenseHandler.bind(null,item.id)}>Delete Expense</button> &nbsp;
                <button onClick={editExpenseHandler.bind(null,item.id)}>Edit Expense</button>
            </li>
        })}
    </ul>
}

export default Expenses;