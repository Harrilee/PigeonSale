import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreatePost from '../posts/CreatePost';

function Navigation() {

    if (localStorage.isLoggedIn === "true" && localStorage.usertype === "user"/*&& !window.location.href.includes("settings")*/) {
        return (
            <nav>
                <CreatePost/>
                <NavLink to={"/"+localStorage.username}>Profile</NavLink>
                <NavLink to={"/"+localStorage.username+"/settings"}>Settings</NavLink>
                <NavLink to="/logout">Log out</NavLink>
            </nav>
            
        )
    }
    // else if (localStorage.isLoggedIn === "true" && window.location.href.includes("settings")) {
    //     return (
    //         <nav>
    //             <NavLink to={"/"+localStorage.username}>Profile</NavLink>
    //             <NavLink to={"/"+localStorage.username+"/settings"}>Settings</NavLink>
    //             <NavLink to="/logout">Log out</NavLink>
    //         </nav>
    //     )
    // }
    return (
       <nav>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </nav>
    )
}

export default Navigation;