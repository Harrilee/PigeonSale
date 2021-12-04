import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, stepLabelClasses  } from "@mui/material";
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

function MyDeals() {

    const [value, setValue] = useState(0);
    const [myDeals, setMyDeals] = useState(-1);
    const [bought, setBought] = useState(-1);
    const [sold, setSold] = useState(-1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getMyDeals = () => {
        DealService.getMyDeals()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setMyDeals(result.data);
            }
            else {
                setMyDeals([]);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getBought = () => {
        DealService.getBought()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setBought(result.data);
            }
            else {
                setBought([]);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

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
            >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Sold" {...a11yProps(1)} />
                <Tab label="Bought" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h1 className="title"> All Deals </h1>
                <DealCards deals={myDeals}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1 className="title"> Sold Items </h1>
                <DealCards deals={sold}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h1 className="title"> Bought Items </h1>
                <DealCards deals={bought}/>
            </TabPanel>
        </Box>
    )
}

export default MyDeals;