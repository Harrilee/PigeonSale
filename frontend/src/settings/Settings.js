import React, { useState } from 'react';
import { Box, Tabs, Tab } from "@mui/material";
import "./Settings.scss";
import ProfileSettings from './ProfileSettings';
import ResetPassword from './ResetPassword';
import AddressEditor from './AddressEditor';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Settings() {

    const [value, setValue] = useState(0);

    const handleChange = (e, newValue) => {
      setValue(newValue);
    };

    return ( 
        <div id="settings-wrapper">
            <Box id="settings-container">
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleChange}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                centered
            >
                <Tab label="Edit Profile" {...a11yProps(0)} />
                <Tab label="Reset Password" {...a11yProps(1)} />
                {localStorage.usertype === "user" ?
                <Tab label="Edit Addresses" {...a11yProps(2)} />
                : <React.Fragment />}
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileSettings />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <ResetPassword/>
            </TabPanel>
            <TabPanel value={value} index={2} >
                <AddressEditor/>
            </TabPanel>
            </Box>
        </div>
    )
}

export default Settings;