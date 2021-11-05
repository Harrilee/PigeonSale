import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import LogoCard from '../components/LogoCard';

function Header() {
    return (
       <header>
          <LogoCard title="Pigeon Sale" size="small" position="left" />
           <nav>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/dashboard">Cart</NavLink>
           </nav>
       </header>
    )
}

export default Header;