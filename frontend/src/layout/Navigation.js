import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    
    if (localStorage.isLoggedIn === "true" && localStorage.type === "user") {
        return (
            <nav>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/logout">Log out</NavLink>
            </nav>
            
        )
    }
    return (
       <nav>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </nav>
    )
}

export default Navigation;