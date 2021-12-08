import React, { useEffect, useState } from 'react';
import AccountService from '../services/account.service';
import { Stack, Box, Rating, Card } from "@mui/material";
import "./Ratings.scss";

function Ratings(props) {

    const [ratings, setRatings] = useState(-1);
    const [avg, setAvg] = useState(0);

    const getRatings = () => {
        console.log(props.user_id)
        AccountService.getRatings(props.user_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setRatings(result.data.details);
                if (result.data.average_rate) {
                    setAvg(result.data.average_rate);
                }
            }
        })
        .catch(err => {
            console.log(err);
            setRatings([]);
        });
    }

    const renderRatings = () => {
        if (ratings === -1) {
            return ( 
                <Stack spacing={3} className="center">
                        {"Loading..."}
                </Stack>
            )
        }
        if (ratings.length > 0) {
            return ( 
                <Stack spacing={3}>
                        {ratings.map((item,i) => {
                            return (
                                <Box className="rating-wrapper" key={i}>
                                    <h2><Rating name="read-only" precision={0.5} value={item.rate} readOnly /></h2>
                                    <div className="rating-comment">{item.comment}</div>
                                </Box>
                            )
                        })}
                </Stack>
            )
        }
        else {
            return ( 
                <Stack spacing={3} className="center">
                        {"No ratings"}
                </Stack>
            )
        }
    };


    useEffect(() => {
        if (ratings === -1 && props.isProfileLoaded) {
            console.log("initialize");
            getRatings();
        }
    }, [props.isProfileLoaded, ratings, getRatings]);



    return (
        <Box id="ratings-container">
        <h1 className="center title">{avg}<br></br>
        <Rating name="read-only" precision={0.5} value={avg} readOnly /> 
        </h1>
            {renderRatings()}
        </Box>
    )
    
    
}

export default Ratings;