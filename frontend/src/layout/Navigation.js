import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreatePost from '../posts/CreatePost';

function Navigation() {

    if (localStorage.isLoggedIn === "true") { 
        if (localStorage.usertype === "user") {
            return (
                <nav>
                    <CreatePost/>
                    <NavLink to="/dashboard">Profile</NavLink>
                    <NavLink to="/dashboard/settings">Settings</NavLink>
                    <NavLink to="/logout">Log out</NavLink>
                </nav>
                
            )
        }
        else if (localStorage.usertype === "staff") {
                return (
                    <nav>
                        <NavLink to="/dashboard">Profile</NavLink>
                        <NavLink to="/dashboard/settings">Settings</NavLink>
                        <NavLink to="/logout">Log out</NavLink>
                    </nav>
                    
                )
        }
    }
    return (
       <nav>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </nav>
    )
}

export default Navigation;