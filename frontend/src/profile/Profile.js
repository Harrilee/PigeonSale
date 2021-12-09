import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from "@mui/material";
import "./Profile.scss";
import AccountService from "../services/account.service";
import PublicPosts from '../posts/PublicPosts';
import ProfileCard from './ProfileCard';
import Ratings from './Ratings';


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


function Profile(props) {

    const { params: { user_id } } = props.match;
    const [profile, setProfile] = useState("");
    const [loaded, setLoaded]= useState(false);
    const [disabled, setDisabled] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        if (!disabled) {
            setValue(newValue);
        }
    };

    const getProfile = () => {
        const request = {
            user_id : user_id
        };
        AccountService.getProfile(request, props.type)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setProfile(result.data);
            }
            else {
                window.location.href="/404";
            }
            setLoaded(true);
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

    const renderProfile = () => {
        if (props.type === "user") {
            return ( 
                    <div id="profile-wrapper">
                    <Box id="profile-container">
                        <ProfileCard data={profile} usertype={props.type} user_id={user_id} />
                        <Box id="tabs-container">
                            <Tabs
                                orientation="horizontal"
                                value={value}
                                onChange={handleChange}
                                sx={{ borderBottom: 1, borderColor: 'divider' }}
                                centered
                            >
                                <Tab label="Shop" {...a11yProps(0)} />
                                <Tab label="Ratings" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <PublicPosts isProfileLoaded={loaded} user_id={user_id} setDisabled={setDisabled} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Ratings user_id={user_id} isProfileLoaded={loaded}  setDisabled={setDisabled} />
                            </TabPanel>
                        </Box>
                    </Box>
                </div>
                )
        }
        else if (props.type === "staff") {
            return ( 
                <div id="profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={profile} usertype={props.type} />
                </Box>
            </div>
            )
        }
        else if (props.type === "admin") {
            return ( 
                <div id="profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={{ }} usertype={props.type} />
                </Box>
            </div>
            )
        }
    }

    if (localStorage.user_id === user_id && props.type === localStorage.usertype) {
        window.location.href="/dashboard";
    }
    else {
        return renderProfile()
    }
}

export default Profile;