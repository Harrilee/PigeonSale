import React, { useEffect, useState, useCallback } from 'react';
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
    const [myDeals, setMyDeals] = useState(-1);
    const [bought, setBought] = useState(-1);
    const [sold, setSold] = useState(-1);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (e, newValue) => {
        if (!disabled) {
            setValue(newValue);
            props.setDisabled(false);
        }
        else {
            props.setDisabled(true);
        }
    };

    const getMyDeals = useCallback(() => {
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
            setMyDeals([]);
        });
    },[]);

    const getBought = useCallback(() => {
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
            setBought([]);
        });
    },[]);

    const getSold = useCallback(() => {
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
            setSold([]);
        });
    },[]);

    useEffect(() => {
        if (myDeals === -1 && value === 0) {
            getMyDeals()
        }
        else if (bought === -1 && value === 2) {
            getBought()
        }
        else if (sold === -1 && value === 1) {
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
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Sold" {...a11yProps(1)} />
                <Tab label="Bought" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h1 className="title"> All Deals </h1>
                <DealCards deals={myDeals} variant="all" setDisabled={setDisabled} setDisabledParent={props.setDisabled}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1 className="title"> Sold Deals </h1>
                <DealCards deals={sold} variant="sold" setDisabled={setDisabled} setDisabledParent={props.setDisabled} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h1 className="title"> Bought Deals </h1>
                <DealCards deals={bought} variant="bought" setDisabled={setDisabled} setDisabledParent={props.setDisabled} />
            </TabPanel>
        </Box>
    )
}

export default MyDeals;