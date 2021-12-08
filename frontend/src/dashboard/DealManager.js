import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab  } from "@mui/material";
import "./Dashboard.scss";
import DealService from '../services/deal.service';
import DealCards from './DealCards';

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

function MyDeals(props) {

    const [value, setValue] = useState(0);
    const [deals, setDeals] = useState(-1);

    const handleChange = (event, newValue) => {
        if (!disabled) {
            setValue(newValue);
            props.setDisabled(false);
        }
        else {
            props.setDisabled(true);
        }
    };

    const getSold = () => {
        DealService.getSold()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setSold(result.data);
            }
            else {
                setSold([])
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (myDeals === -1 && value == 0) {
            getMyDeals()
        }
        else if (bought === -1 && value == 2) {
            getBought()
        }
        else if (sold === -1 && value == 1) {
            getSold()
        }
    }, [myDeals, getMyDeals, bought, getBought, sold, getSold, value]);

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
                <Tab label="All Deals" {...a11yProps(0)} />
                <Tab label="All Rates" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h1 className="title"> All Deals </h1>
                <DealCards deals={myDeals} variant="all" setDisabled={setDisabled} setDisabledParent={props.setDisabled}/>
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
        </Box>
    )
}

export default MyDeals;