import React from 'react';
import Navigation from './Navigation';
import './Header.scss';
import LogoCard from '../components/LogoCard';

function Header() {
    return (
       <header>
          <LogoCard title="Pigeon Sale" size="small" position="left" />
          <Navigation />
       </header>
    )
}

export default Header;