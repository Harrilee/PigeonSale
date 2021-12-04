import React from 'react';
import Navigation from './Navigation';
import './Header.scss';
import LogoCard from '../components/LogoCard';
import SearchBar from './SearchBar';

function Header() {
    return (
       <header>
          <LogoCard title="Pigeon Sale" size="small" position="left" />
          <SearchBar/>
          <Navigation />
       </header>
    )
}

export default Header;