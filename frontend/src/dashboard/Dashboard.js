import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab  } from "@mui/material";
import "./Dashboard.scss";
import AccountService from "../services/account.service";
import MyPosts from '../dashboard/MyPosts';
import ProfileCard from '../profile/ProfileCard';
import MyDeals from './MyDeals';
import Ratings from '../profile/Ratings';


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

function Dashboard() {

    const [value, setValue] = useState(0);
    const [profile, setProfile] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleChange = (event, newValue) => {
        if (!disabled) {
            setValue(newValue);
            setDisabled(true);
        }
    };

    const getProfile = () => {
        const email = localStorage.email;
        const request = {
            email : email
        };
        AccountService.getProfile(request, localStorage.usertype)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setProfile(result.data);
                console.log(result.data);
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


    if (localStorage.usertype === "user") {
        return ( 
            <div id="profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={profile} usertype={localStorage.usertype} user_id={localStorage.user_id} />
                    <Box id="tabs-container">
                        <Tabs
                            orientation="horizontal"
                            value={value}
                            onChange={handleChange}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            centered
                        >
                            <Tab label="My Shop" {...a11yProps(0)} />
                            <Tab label="My Deals" {...a11yProps(1)} />
                            <Tab label="My Ratings" {...a11yProps(2)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <MyPosts isProfileLoaded={loaded} setDisabled={setDisabled} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MyDeals setDisabled={setDisabled}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Ratings user_id={localStorage.user_id} isProfileLoaded={loaded} setDisabled={setDisabled} />
                        </TabPanel>
                    </Box>
                </Box>
            </div>
        )
    }
    else if (localStorage.usertype === "staff") {
        return ( 
            <div id="staff-profile profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={profile} usertype={localStorage.usertype} user_id={localStorage.user_id} />
                    <Box id="tabs-container">
                        <Tabs
                            orientation="horizontal"
                            value={value}
                            onChange={handleChange}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            centered
                        >
                            <Tab label="User Manager" {...a11yProps(0)} />
                            <Tab label="Post Manager" {...a11yProps(1)} />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            Users
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MyDeals setDisabled={setDisabled} />
                        </TabPanel>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default Dashboard;