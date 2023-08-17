const Expenses =(props)=>{
    return <ul>
        {props.items.map(item=>{
            return<li>
                {item.amount} &nbsp;
                {item.description}&nbsp;
                {item.category} &nbsp;
            </li>
        })}
    </ul>
}

export default Expenses;