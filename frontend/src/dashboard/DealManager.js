import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab  } from "@mui/material";
import "./Dashboard.scss";
import AdminService from '../services/admin.service';
import SimpleDealCards from './SimpleDealCards';
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

function DealManager(props) {

    const [value, setValue] = useState(0);
    const [deals, setDeals] = useState(-1);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event, newValue) => {
        if (!disabled) {
            setValue(newValue);
            props.setDisabled(false);
        }
        else {
            props.setDisabled(true);
        }
    };

    const getDeals = () => {
        AdminService.getDeals()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setDeals(result.data);
            }
            else {
                setDeals([])
            }
        })
        .catch(err => {
            console.log(err);
            setDeals(0)
        });
    }

    useEffect(() => {
        if (deals === -1 && value == 0 && props.isProfileLoaded) {
            getDeals()
        }
    }, [deals, getDeals, value]);

    return ( 
        <Box id="deals-container">
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, 
                    borderColor: 'divider', 
                    width:"15%", 
                    float: "left" }}
                disabled={disabled}
            >
                <Tab label="Deals" {...a11yProps(0)} />
                <Tab label="Cancellations" {...a11yProps(1)} />
                <Tab label="All Rates" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h1 className="title">Deals </h1>
                <SimpleDealCards deals={deals} variant="all" setDisabled={setDisabled} setDisabledParent={props.setDisabled}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1 className="title">Cancellations </h1>
                <SimpleDealCards deals={deals} variant="cancelled" setDisabled={setDisabled} setDisabledParent={props.setDisabled}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h1 className="title">Rates </h1>
                <Ratings deals={deals} setDisabledParent={props.setDisabled} setDisabled={setDisabled} />
            </TabPanel>
        </Box>
    )
}

export default DealManager;