import React, { useState } from 'react';
import './Header.scss';
import { InputBase } from "@mui/material";
import SearchIcon from '../icons/SearchIcon';

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
        <form id="search-bar" onSubmit={search}>
          <InputBase
            placeholder="Search" 
            onChange={handleSearch} 
            value={keyword}
            startAdornment={<SearchIcon />}
         />
        </form>
    )
}

export default Header;