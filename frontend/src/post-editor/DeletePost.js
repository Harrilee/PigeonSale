import React, { useState } from 'react';
import "./PostEditor.scss";
import DeleteIcon from '../icons/DeleteIcon';
import { Modal, Box, Button } from "@mui/material";

import PostService from '../services/post.service';

function DeletePost(props) {

    const [openModal, setOpenModal] = useState(false);
    const [deletingText, setDeletingText] = useState("");

    const handleOpen = (bool) => setOpenModal(bool);

    const deletePost = () => {
        PostService.deletePost(props.post_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            if (result.status === 1) {
                setDeletingText("");
                handleOpen(false);
                window.location.reload();
            }
            else {
                setDeletingText("Hm, something went wrong...");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
       <React.Fragment>
       <div name="open" onClick={handleOpen} name="deletePost" id="delete-button"><DeleteIcon /></div>
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