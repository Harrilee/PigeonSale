
import React, { useState } from 'react';
import { Box, Button, InputBase, Modal, Rating } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';
import DeleteIcon from '../icons/DeleteIcon';

function RateEditor(props) {

    const [openModal, setOpenModal] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        setRating(0);
        setComment("");
    }

    const handleSubmit = () => {
        setDisabled(true);
        const values = {
            rate: rating,
            comment : comment
        }
        DealService.rateDeal(props.deal_id, values)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setOpenModal(false);
                setAlertCard(({ type: "success", status: true, msg: "Posted Successfully" }));
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

    const handleDelete = () => {
        setDisabled(true);
        DealService.deleteRating(props.deal_id)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setAlertCard(({ type: "success", status: true, msg: "Deleted Successfully" }));
                setOpenModal(false);
                window.location.reload();
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

    if (localStorage.usertype==="user" && props.canrate) {
    return (
        <React.Fragment>
        <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Button variant="contained" className="deal-button rate-button" onClick={handleOpen}>{props.name}</Button>
        <Modal id="mini-editor-modal"
            open={openModal}
            >
           <Box id="mini-editor-container" className="rating-editor-container">
                <h1 className="center"><Rating value={rating} onChange={(e,value) => {setRating(value) }} defaultValue={1} /> </h1>
                <h2 className="center title">{rating} star{rating !== 1 ? "s" : ""} </h2>
                <div className="text-form">
               <InputBase fullWidth 
                    placeholder="Comment" 
                    onChange={(e) => setComment(e.target.value)} 
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
    else if (localStorage.usertype === "staff") {
        return (
            <React.Fragment>
            <AlertCard severity={alertCard.type} id="editor-alert" 
                    display={alertCard.status} 
                    message={alertCard.msg}
                    static={false} />
                <DeleteIcon onClick={handleOpen} />
                <Modal open={openModal} id="delete-modal">
            <Box id="delete-modal-container">
                <h2>Are you sure you want to delete this rating?</h2>
                <Button name="yes" variant="outlined" onClick={handleDelete}>Yes</Button>
                <Button name="no" variant="contained" onClick={handleClose}>No</Button>
            </Box>
        </Modal>
            </React.Fragment>
        )
    }
    else {
        return <React.Fragment/>
    }

}

export default RateEditor;