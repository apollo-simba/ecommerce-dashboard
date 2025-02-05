import React, { FC, useState } from "react"



const Head:FC =()=>{
    const [count, setCount] = useState<number>(0);
    return(

    <ul className="box-info">
        <li>
            <i className="bx bxs-cart"></i>
            <span className="text">
                <h3>{count}</h3>
                <button >New Orders</button>
                
            </span>
        </li>
        <li>
            <i className="bx bxs-user-check"></i>
            <span className="text">
                <h3>389</h3>
                <p>Customers</p>
            </span>
        </li>
        <li>
            <i className="bx bxs-dollar"></i>
            <span className="text">
                <h3>$43,570</h3>
                <p>Total Revenue</p>
            </span>
        </li>
    </ul>
    )
}
export default Head;