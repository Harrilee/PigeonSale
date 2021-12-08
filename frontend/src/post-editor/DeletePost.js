import React, { useState } from 'react';
import "./PostEditor.scss";
import DeleteIcon from '../icons/DeleteIcon';
import { Modal, Box, Button } from "@mui/material";

import PostService from '../services/post.service';

function DeletePost(props) {

    const [openModal, setOpenModal] = useState(false);

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
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
       <React.Fragment>
       <div className="editor-button" id="delete-button"><DeleteIcon onClick={handleOpen} /></div>
       <Modal open={openModal} id="delete-modal">
           <Box id="delete-modal-container">
            <h1>Are you sure you want to delete this post?</h1>
            <Button name="yes" variant="outlined" onClick={deletePost}>Yes</Button>
            <Button name="no" variant="contained" onClick={() => { handleOpen(false) }}>No</Button>
           </Box>
       </Modal>
       </React.Fragment>
    )
}

export default DeletePost;