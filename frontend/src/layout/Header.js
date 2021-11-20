import React, { useState } from 'react';
import Navigation from './Navigation';
import './Header.scss';
import LogoCard from '../components/LogoCard';
import { InputBase } from "@mui/material";

function Header() {

   const [keyword, setKeyword] = useState("");

   const handleSearch = (e) => {
      let keyword = e.target.value;
      setKeyword(keyword);
   }

   const search = (e) => {
      e.preventDefault();
      window.location.href="/search/"+keyword;
   }

    return (
       <header>
          <LogoCard title="Pigeon Sale" size="small" position="left" />
          <form onSubmit={search}>
          <InputBase id="search-bar"
            placeholder="Search" 
            onChange={handleSearch} 
            value={keyword}
         />
         </form>
          <Navigation />
       </header>
    )
}

export default Header;