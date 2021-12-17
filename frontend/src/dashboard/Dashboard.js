import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab  } from "@mui/material";
import "./Dashboard.scss";
import AccountService from "../services/account.service";
import MyPosts from '../dashboard/MyPosts';
import ProfileCard from '../profile/ProfileCard';
import DealManager from './DealManager';
import MyDeals from './MyDeals';
import Ratings from '../profile/Ratings';
import UserManager from './UserManager';


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
        if (localStorage.usertype !== "admin") {
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
                    setLoaded(true);
                }
            })
            .catch(err => {
                setLoaded(false);
            });
        }
        else {
            setProfile({});
            setLoaded(true);
        }
    }

    const renderDash = () => {
        if (localStorage.usertype === "user") {
            return (<Box id="tabs-container">
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
            </Box>)
        }
        else if (localStorage.usertype === "staff") {
            return (<Box id="tabs-container">
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleChange}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                centered
            >
                <Tab label="User Manager" {...a11yProps(0)} />
                <Tab label="Deal Manager" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <UserManager type="user" isProfileLoaded={loaded} setDisabled={setDisabled} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DealManager isProfileLoaded={loaded} setDisabled={setDisabled} />
            </TabPanel>
            </Box>)
        }
        else if (localStorage.usertype === "admin") {
            return (<Box id="tabs-container">
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleChange}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                centered
            >
                <Tab label="User Manager" {...a11yProps(0)} />
                <Tab label="Staff Manager" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <UserManager type="user" isProfileLoaded={loaded} setDisabled={setDisabled} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserManager type="staff" isProfileLoaded={loaded} setDisabled={setDisabled} />
            </TabPanel>
            </Box>)
        }
    }

    useEffect(() => {
        if (profile.length === 0) {
            getProfile();
        }
    });


   
    return ( 
            <div id="profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={profile} usertype={localStorage.usertype} user_id={localStorage.user_id} />
                    {renderDash()}
                </Box>
            </div>
    )
}

export default Dashboard;