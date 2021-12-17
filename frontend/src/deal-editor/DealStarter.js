import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';
import "../posts/FullPost.scss";
import { Box, Divider } from "@mui/material";
import AddressEditor from '../settings/AddressEditor';
import PaymentMethod from './PaymentMethod';

function DealStarter() {

    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });
    const {post_id, user_id } = useParams();
    const [address, setAddress] = useState({});

    const getSelectedAddress = (values) => {
        setAddress(values);
    }

    const handleSubmit = () => {
        DealService.createDeal(post_id, address)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setAlertCard({ type: "success", status: false, msg: "Deal created succesfully" });
                window.location.href="/";
            }
            else if (result.status === 0) {
                if (result.code === "021") {
                    setAlertCard(({ type: "error", status: true, msg: "Deal already in progress or sold out." }));
                    setTimeout(() => {window.location.href="/";}, 5000);
                }
                else if (result.code === "000") {
                    setAlertCard(({ type: "error", status: true, msg: "Address required" }));
                }
            }
        })
        .catch(err => {
            setAlertCard(({ type: "error", status: true, msg: "Something went wrong..." }));
        });
    }

    if (user_id !== undefined && localStorage.isLoggedIn) {
    return (
        <React.Fragment>
        <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Box id="settings-wrapper">
            <div id="settings-container">
                <div id="deal-starter">
                <h1 className="left">Start Deal</h1>
                <br />
                <h2>Pick a payment method:</h2>
                <PaymentMethod />
                <br />
                <Divider/>
                <br />
                <AddressEditor variant="editing-selecting" getSelectedAddress={getSelectedAddress} />
                <br />
                <Divider/>
                <br />
                <Button variant="contained" type="submit" className="confirm-button" onClick={handleSubmit}>Confirm Deal</Button>
                </div>
            </div>
        </Box>
        </React.Fragment>
    )
    }
    else {
        window.location.href="/login";
    }

}

export default DealStarter;