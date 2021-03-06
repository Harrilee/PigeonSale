import React, { useState } from 'react';
import "./PostEditor.scss";
import DeleteIcon from '../icons/DeleteIcon';
import { Modal, Box, Button } from "@mui/material";
import AlertCard from '../components/AlertCard';
import PostService from '../services/post.service';

function DeletePost(props) {

    const [openModal, setOpenModal] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const handleOpen = (bool) => setOpenModal(bool);

    const deletePost = () => {
        PostService.deletePost(props.post_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                handleOpen(false);
                window.location.reload();
            }
            else {
                setAlertCard({ type: "error", status: false, msg: result.msg });
            }
        })
        .catch(err => {
            setAlertCard({ type: "error", status: false, msg: "Could not delete" });
        });
    }

    return (
       <React.Fragment>
        <AlertCard severity={alertCard.type} id="editor-alert" 
                    display={alertCard.status} 
                    message={alertCard.msg}
                    static={false} />
       <div className="editor-button" id="delete-button"><DeleteIcon onClick={handleOpen} /></div>
       <Modal open={openModal} id="delete-modal">
           <Box id="delete-modal-container">
            <h2>Are you sure you want to delete this post?</h2>
            <Button name="yes" variant="outlined" onClick={deletePost}>Yes</Button>
            <Button name="no" variant="contained" onClick={() => { handleOpen(false) }}>No</Button>
           </Box>
       </Modal>
       </React.Fragment>
    )
}

export default DeletePost;