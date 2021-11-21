import React from 'react';
import CreatePost from '../posts/CreatePost';
import AccountMenu from './AccountMenu';
import { NavLink } from 'react-router-dom';

function Navigation() {

    if (localStorage.isLoggedIn === "true") { 
        if (localStorage.usertype === "user") {
            return (
                <nav>
                    <CreatePost/>
                    <AccountMenu />
                </nav>
                
            )
        }
        else if (localStorage.usertype === "staff") {
                return (
                    <nav>
                        <AccountMenu />
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