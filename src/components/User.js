import { useState } from "react";

const User = ({name}) => {
    const [count1, setCount1]= useState(0);
   
    return(
        <div className="userCard">
            <h2>Count 1: {count1}</h2>
            
            <button onClick={ () => {
                setCount1(count1 + 1);
            }}>
                increase button
            </button>
            
            <h2>Name: {name}</h2>
            <h3>Location: Oak Harbor, Washington</h3>
            <h4>Location: Oak Harbor, Washington</h4>
            <h2>Contact: john@gmail.com</h2>
        </div>

    );
};
export default User;