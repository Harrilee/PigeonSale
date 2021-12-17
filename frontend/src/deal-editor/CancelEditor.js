
import React, { useState } from 'react';
import { Box, Button, InputBase, Modal, Dialog, DialogContent } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';

function CancelEditor(props) {

    const [openModal, setOpenModal] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [comment, setComment] = useState("");
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

    const handleOpen = () => { setOpenModal(true); } 
    const handleClose = () => { setOpenModal(false); }

    const handleSubmit = () => {
        setDisabled(true);
        DealService.cancelDeal(props.deal_id, comment)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setOpenConfirm(true);
                setOpenModal(false);
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

    return (
        <React.Fragment>
        <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Button variant="text" className="deal-button cancel-button" onClick={handleOpen}>Cancel Deal</Button>
        <Modal id="mini-editor-modal"
            open={openModal}
            >
           <Box id="mini-editor-container" className="cancel-editor-container">
                <h2 className="center" style={{padding:"1.5em"}}>Deal Cancellation</h2>
                <div className="center" style={{paddingBottom:"1.5em"}}>Are you sure you want to cancel this deal?</div>
                <div className="text-form">
               <InputBase fullWidth 
                    placeholder="Please provide a reason" 
                    onChange={(e, value) => setComment(value)} 
                    value={comment}
                    disabled={disabled}
                    multiline
                    rows={5} />
                </div>
                <Button name="close" variant="contained" disabled={disabled} onClick={handleClose}>Close</Button>
                <Button type="submit" variant="contained" name="post"
                    disabled={disabled} onClick={handleSubmit}>Confirm</Button>
           </Box>
        </Modal>
        <Dialog id="confirmation-modal"
            open={openConfirm}>
            <DialogContent>
                <h2 className="title center">Your deal ID#{props.deal_id} has been cancelled.</h2>
                <Button variant="contained" onClick={() => window.location.reload()}>OK</Button>
            </DialogContent>
        </Dialog>
        </React.Fragment>
    )

}

export default CancelEditor;