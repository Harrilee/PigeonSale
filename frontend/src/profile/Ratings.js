import React, { useEffect, useState } from 'react';
import AccountService from '../services/account.service';
import { Stack, Box, Rating } from "@mui/material";
import "./Ratings.scss";

function Ratings(props) {

    const [ratings, setRatings] = useState(-1);
    const [avg, setAvg] = useState(0);

    const getRatings = () => {
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
            props.setDisabled(false);
        })
        .catch(err => {
            console.log(err);
            setRatings([]);
            props.setDisabled(false);
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
            return ratings.map((item,i) => {
                            return (
                                <Box className="rating-wrapper" key={i}>
                                    <div className="rating-name">
                                        <div className="post-avatar" style={{ backgroundImage: "url('/default/empty-icon.png')", backgroundSize: "100%" }}></div>
                                        <div className="post-author">
                                            Anon
                                        </div>
                                    </div>
                                    <div className="rating-rater">
                                        {item.time}
                                    </div>
                                    <h2><Rating name="read-only" precision={0.5} value={item.rate} readOnly /></h2>
                                    <div className="rating-comment">{item.comment}</div>
                                </Box>
                            )
                        })
            
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
            props.setDisabled(true);
            getRatings();
        }
    }, [props.isProfileLoaded, ratings, getRatings]);



    return (
        <Box id="ratings-container">
        <h1 className="title center">{avg}<br></br>
        <Rating name="read-only" precision={0.5} value={avg} readOnly />
        </h1>
            {renderRatings()}
        </Box>
    )
    
    
}

export default Ratings;