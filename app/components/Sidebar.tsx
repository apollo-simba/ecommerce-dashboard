
import React, { FC } from 'react';
import "../styles/globals.css";
import Link from 'next/link';


const Sidebar: FC = () => {

    return (
        <div id='sidebar'>
            <a  className="brand">
                <img 
                    src="https://media.geeksforgeeks.org/gfg-gg-logo.svg" 
                    alt="GFG Logo" 
                />
                <span className="text">admin Panel</span>
            </a>
            <ul className="side-menu top">
                <li >
                    <Link href={"/dashboard"} >
                        <i className="bx bxs-dashboard group-hover/link:bg-primary"></i>
                        <span className="text">
                            <div >Dashboard</div>
                        </span>
                    </Link>
                </li>
                <li >
                    <Link href={"/dashboard/Orders"}>
                        <i className="bx bxs-cart-add group-hover/link:bg-primary"></i>
                        <span className="text">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/Products">
                        <i className="bx bxs-store"></i>
                        <span className="text">Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/Customers">
                        <i className="bx bxs-user"></i>
                        <span className="text">Customers</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/Analytics">
                        <i className="bx bxs-chart"></i>
                        <span className="text">Analytics</span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#">
                        <i className="bx bxs-cog"></i>
                        <span className="text">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="logout">
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
