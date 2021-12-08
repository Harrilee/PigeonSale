
import React, { useState } from 'react';
import { Box, Button, InputBase, Modal, Rating } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';

function RateEditor(props) {

    const [openModal, setOpenModal] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleSubmit = () => {
        setDisabled(true);
        DealService.rateDeal(props.deal_id, comment)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setOpenModal(false);
            }
            else if (result.status === 0) {
                setAlertCard(({ type: "error", status: true, msg: result.msg }));
            }
            setDisabled(false);
        })
        .catch(err => {
            console.log(err);
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
        <Button variant="text" className="deal-button" onClick={handleOpen}>Rate Product</Button>
        <Modal id="mini-editor-modal"
            open={openModal}
            >
           <Box id="mini-editor-container" className="rating-editor-container">
                <h1 className="center"><Rating value={rating} onChange={(e,value) => { let v = value ? value : 0; setRating(v) }} defaultValue={0} /> </h1>
                <h2 className="center title">{rating} star{rating !== 1 ? "s" : ""} </h2>
                <div className="text-form">
               <InputBase fullWidth 
                    placeholder="Comment" 
                    onChange={(e, value) => setComment(value)} 
                    value={comment}
                    disabled={disabled}
                    multiline
                    rows={5} />
                </div>
                <Button name="close" variant="contained" disabled={disabled} onClick={handleClose}>Close</Button>
                <Button type="submit" variant="contained" name="post"
                    disabled={disabled} onClick={handleSubmit}>Post</Button>
           </Box>
        </Modal>
        </React.Fragment>
    )

}

export default RateEditor;