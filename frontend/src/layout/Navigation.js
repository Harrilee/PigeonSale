import React from 'react';
import CreatePost from '../post-editor/CreatePost';
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
                        <div className="staff-badge">Staff</div>
                        <AccountMenu />
                    </nav>
                    
                )
        }
        else if (localStorage.usertype === "admin") {
            return (
                <nav>
                    <div className="admin-badge">Admin</div>
                    <AccountMenu />
                </nav>
                
            )
    }
    }
    return (
       <nav id="guest-nav">
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </nav>
    )
}

export default Navigation;