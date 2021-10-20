import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
       <header>
           <div id="title">Pigeon Sale</div>
           <div id="links">
               <NavLink activeClassName="active" to="/login">Login</NavLink>
               <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
           </div>
       </header>
    )
}

export default Header;