import React, { useEffect, useState } from 'react';
import "../post-editor/PostEditor.scss";
import { Modal, Box, Button } from "@mui/material";

function DeleteAddress(props) {

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (props.openModal.openDeletion !== openModal) {
            setOpenModal(props.openModal.openDeletion);
        }
    },[props, openModal]);

    return (
       <React.Fragment>
       <Modal open={openModal} id="delete-modal">
           <Box id="delete-modal-container">
            <h2>Are you sure you want to delete this address?</h2>
            <Button name="yes" variant="outlined" onClick={() => props.deleteAddress()}>Yes</Button>
            <Button name="no" variant="contained" onClick={() => { props.openModal.setOpenDeletion(false) }}>No</Button>
           </Box>
       </Modal>
       </React.Fragment>
    )
}

export default DeleteAddress;