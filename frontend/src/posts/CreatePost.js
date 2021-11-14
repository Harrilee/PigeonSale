import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Checkbox } from "@mui/material";
import LockOpenIcon from '../icons/LockOpenIcon';
import LockCloseIcon from '../icons/LockCloseIcon';
import "./CreatePost.scss";
import PostService from "../services/post.service";

function CreatePost() {

    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [price, setPrice] = useState("");
    const [postButton, setPostButton] = useState("Post");
    const [checked, setPostPrivacy] = useState(false);

    const handleTitle = (e) => {
        let title = e.target.value;
        setTitle(title);
    }

    const handleBody = (e) => {
        let body = e.target.value;
        setBody(body);
    }

    const handlePrice = (e) => {
        let price = e.target.value;
        setPrice(price);
    }

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        setTitle("");
        setBody("");
        setPrice("");
    }

    const handlePrivacy = (e) => {
        setPostPrivacy(e.target.checked);
        if (e.target.checked) {
            setPostButton("Post Privately");
        }
        else {
            setPostButton("Post");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted");

        let values = {
            post_title: title,
            post_content: body,
            post_status: checked,
            post_product_price: parseFloat(price)
        };

        console.log("Values submitted: ", values);

        PostService.createPost(values)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                console.log("Posted");
                console.log(result);
                handleClose();
            }
            if (result.status === 0) {
                console.log(result);
            }
        })
        .catch(err => {
            console.log(err);
        });

    }


    return (
       <React.Fragment>
       <span name="open" onClick={handleOpen} name="createpost">Create Post</span>
       <div id="create-post-wrapper">
           <Modal
            open={openModal}
            >
           <Box id="create-post-container">
               <form onSubmit={handleSubmit}>
               <TextField
                    placeholder="Title" 
                    onChange={handleTitle} 
                    value={title}
                    variant="filled"
                fullWidth />
               <TextField
                    placeholder="Your text here" 
                    onChange={handleBody} 
                    value={body}
                    multiline
                    rows={10}
                    variant="filled"
                fullWidth />
                <TextField
                    placeholder="Price" 
                    onChange={handlePrice} 
                    value={price}
                    variant="filled"
                fullWidth />
               <Button name="close" variant="contained" onClick={handleClose}>Close</Button>
               <Button name="save" variant="outlined">Save as Draft</Button>

               <Button type="submit" variant="contained" name="post">{postButton}</Button>

               <div id="post-privacy">
               <Checkbox
                icon={<LockOpenIcon />}
                checkedIcon={<LockCloseIcon />}
                onChange={handlePrivacy}
                checked={checked}
                /></div>
                </form>
           </Box>
           </Modal>
       </div>
       
       </React.Fragment>
    )
}

export default CreatePost;