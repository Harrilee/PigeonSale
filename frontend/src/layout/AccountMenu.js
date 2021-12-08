import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Divider } from "@mui/material";

function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return ( 
      <div id="account-menu">
      <IconButton
        id="menu-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <div id="menu-avatar">
        <div id="menu-avatar-image" style={{ backgroundImage: "url('"+ localStorage.avatar + "')", backgroundSize: "100%" }}></div>
      </div>
      </IconButton>
      <Menu
        id="menu-dropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        PaperProps={{ sx: { width: 150 } }}
      >
        <MenuItem onClick={() => {
          window.location.href="/dashboard";
        }}>Dashboard</MenuItem>
        <MenuItem onClick={() => {
          window.location.href="/settings";
        }}>Settings</MenuItem>
        <Divider/>
        <MenuItem onClick={() => {
          window.location.href="/logout";
        }}>Logout</MenuItem>
      </Menu>
    </div>
    )
}

export default AccountMenu;