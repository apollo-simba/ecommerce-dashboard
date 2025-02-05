'use client';
import React, { useState, useEffect, FC } from 'react';
import 'boxicons/css/boxicons.min.css';
import "../styles/globals.css";

const Navbar: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (isDarkMode) {
            console.log("this button clicked");
            document.body.classList.add('dark');
        } else {
            console.log("that button clicked");
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="top-navbar">
            <a href="#" className="nav-link">
                Categories
            </a>
            <form action="#">
                <div className="form-input">
                    <input
                        type="search"
                        placeholder="Search..."
                    />
                    <button type="submit" className="search-btn">
                        <i className="bx bx-search"></i>
                    </button>
                </div>
            </form>
            <input
                type="checkbox"
                id="switch-mode"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                hidden
            />
            <label
                htmlFor="switch-mode"
                className="switch-mode">
            </label>
            <a href="#" className="notification">
                <i className="bx bxs-bell"></i>
                <span className="num">5</span>
            </a>
            <a href="#" className="profile">
                <img
                    src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
                    alt="Profile"
                />
            </a>
        </nav>
    );
};

export default Navbar;