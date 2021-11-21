import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography  } from "@mui/material";
import "./Dashboard.scss";
import AccountService from "../services/account.service";
import MyPosts from '../dashboard/MyPosts';
import ProfileCard from '../profile/ProfileCard';


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
            <Typography>{children}</Typography>
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

function Dashboard() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [profile, setProfile] = useState("");
    const [loaded, setLoaded] = useState(false);

    const getProfile = () => {
        const email = localStorage.email;
        const request = {
            email : email
        };
        AccountService.getProfile(request)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setProfile(result.data);
                setLoaded(true);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (profile.length === 0) {
            getProfile();
        }
    });


    return ( 
        <div id="profile-wrapper">
            <Box id="profile-container">
                <ProfileCard data={profile} />
                <Box id="dashboard-container">
                    <Tabs
                        orientation="horizontal"
                        value={value}
                        onChange={handleChange}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                        centered
                    >
                        <Tab label="My Shop" {...a11yProps(0)} />
                        <Tab label="My Orders" {...a11yProps(1)} />
                        <Tab label="Other" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <MyPosts isProfileLoaded={loaded} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard;