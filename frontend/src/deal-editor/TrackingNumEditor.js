
import React, { useState } from 'react';
import { Box, Button, InputBase, Modal } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';

function TrackingNumEditor(props) {

    const [openModal, setOpenModal] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [tracking, setTracking] = useState("");
    const [tracking2, setTracking2] = useState("");
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleSubmit = () => {
        if (tracking === tracking2) {
            if (tracking.length > 0 || tracking2.length > 0) {
                setAlertCard(({ type: "error", status: true, msg: "No empty fields" }));
            }
            DealService.addTrackingNumber(props.deal_id, tracking)
            .then(res => res.json())
            .then(result => {
                if (result.status === 1) {
                    setOpenModal(false);
                    setAlertCard(({ type: "success", status: true, msg: "Added successfully" }));
                    window.location.reload();
                }
                else if (result.status === 0) {
                    setAlertCard(({ type: "error", status: true, msg: result.msg }));
                }
                setDisabled(false);
            })
            .catch(err => {
                setAlertCard(({ type: "error", status: true, msg: "Something went wrong..." }));
                setDisabled(false);
            });
        }
        else {
            setAlertCard(({ type: "error", status: true, msg: "Numbers do not match" }));
            setDisabled(false);
        }
    }

    return (
        <React.Fragment>
         <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Button variant="text" className="deal-button" onClick={handleOpen}>{props.name} Tracking Number</Button>
        <Modal id="mini-editor-modal"
            open={openModal}
            >
           <Box id="mini-editor-container" className="tracking-editor-container">
                <div className="text-form">
               <InputBase fullWidth 
                    placeholder="Enter Express Tracking Number" 
                    onChange={(e) => setTracking(e.target.value)} 
                    value={tracking}
                    disabled={disabled} />
                </div>
                <div className="text-form borderless">
                <InputBase fullWidth 
                    placeholder="Confirm Express Tracking Number" 
                    onChange={(e) => setTracking2(e.target.value)} 
                    value={tracking2}
                    disabled={disabled} />
                </div>
                <Button name="close" variant="contained" disabled={disabled} onClick={handleClose}>Close</Button>
                <Button type="submit" variant="contained" name="post"
                    disabled={disabled} onClick={handleSubmit}>Confirm</Button>
           </Box>
        </Modal>
        </React.Fragment>
    )

}

export default TrackingNumEditor;