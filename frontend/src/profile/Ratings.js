import React, { useCallback, useEffect, useState } from 'react';
import AccountService from '../services/account.service';
import { Stack, Box, Rating } from "@mui/material";
import "./Ratings.scss";
import RateEditor from '../deal-editor/RateEditor';

function Ratings(props) {

    const [ratings, setRatings] = useState(-1);
    const [avg, setAvg] = useState(0);

    const getRatings = useCallback(() => {
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
            setRatings([]);
            props.setDisabled(false);
        });
    },[props]);

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
                                            User
                                        </div>
                                    </div>
                                    <div className="rating-rater">
                                        {item.time}
                                    </div>
                                    <h2><Rating name="read-only" precision={0.5} value={item.rate} readOnly /></h2>
                                    <div className="rating-comment">{item.comment}</div>
                                    {localStorage.usertype === "staff"
                                    ? <RateEditor deal_id={item.deal_id}  />
                                    : <React.Fragment/>}
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
        else if (ratings === -1 && localStorage.usertype === "staff") {
            props.setDisabled(true);
            let dealRatings = [];
            for (let i=0; i < props.deals.length;i++) {
                if (props.deals[i].rate.buyer_rate) {
                    let rateComment= { deal_id: props.deals[i].deal_id, time: props.deals[i].rate.buyer_rate_time, comment :  props.deals[i].rate.buyer_comment, rate: props.deals[i].rate.buyer_rate}
                    dealRatings.push(rateComment);
                }
                if (props.deals[i].rate.seller_rate) {
                    let rateComment= { deal_id: props.deals[i].deal_id, time: props.deals[i].rate.seller_rate_time, comment :  props.deals[i].rate.seller_comment, rate: props.deals[i].rate.seller_rate}
                    dealRatings.push(rateComment);
                }
            }
            setRatings(dealRatings)
            props.setDisabled(false);
        }
    }, [props, ratings, getRatings]);



    return (
        <Box id="ratings-container">
        {localStorage.usertype !== "staff" ?
        <h1 className="title center">{avg} <br></br><Rating name="read-only" precision={0.5} value={avg} readOnly /> </h1>
        : <React.Fragment/>}
            {renderRatings()}
        </Box>
    )
    
    
}

export default Ratings;