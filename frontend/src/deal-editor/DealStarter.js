import React, { useState } from 'react';
import { Button, Dialog, DialogContent } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';
import LogoCard from '../components/LogoCard';
import PostService from "../services/post.service";
import "../posts/FullPost.scss";
import { Box } from "@mui/material";
import AddressEditor from '../settings/AddressEditor';

function DealStarter(props) {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const handleSubmit = () => {
        DealService.confirmReceipt(props.deal_id)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setOpenConfirm(true);
            }
            else if (result.status === 0) {
                setAlertCard(({ type: "error", status: true, msg: result.msg }));
            }
        })
        .catch(err => {
            console.log(err);
            setAlertCard(({ type: "error", status: true, msg: "Something went wrong..." }));
        });
    }

    return (
        <Box id="full-post-container" className="center">
            <h1 className="left">Start Deal</h1>
            <AddressEditor />
        </Box>
    )

}

export default DealStarter;