import React, { useEffect, useState } from 'react';
import { Box, Button, InputBase, InputAdornment, Modal, Checkbox } from "@mui/material";
import LockOpenIcon from '../icons/LockOpenIcon';
import LockCloseIcon from '../icons/LockCloseIcon';
import "./PostEditor.scss";
import PostService from "../services/post.service";
import AlertCard from '../components/AlertCard';
import ImageUploader from './ImageUploader';

function PostEditor(props) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [price, setPrice] = useState("");
    const [postButton, setPostButton] = useState("Post");
    const [checked, setChecked] = useState(false);
    const [postStatus, setPostStatus] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

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

    const handleClose = () => {
        props.handleOpen(false);
        setTitle("");
        setBody("");
        setPrice("");
    }

    const handlePrivacy = (e) => {
        let val = 0;
        if (e.target.checked) {
            val = 2;
            setPostButton("Post Privately");
        }
        else {
            val = 1;
            setPostButton("Post");
        }
        setChecked(e.target.checked);
        setPostStatus(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true);
        let values = {
            post_title: title,
            post_content: body,
            post_status: postStatus,
            post_product_price: parseFloat(price)
        };

        if (price.length === 0) {
            setAlertCard({ type: "error", status: true, msg: "Price required" });
        }
        if (title.length === 0 && body.length === 0 && price.length === 0) {
            setAlertCard({ type: "error", status: true, msg: "Input required" });
        }
        
        setTimeout(() => {
            if (alertCard.status == false) {
                if (props.variant === "create") {
                    PostService.createPost(values)
                    .then(res => {
                        return res.json();
                    })
                    .then(result => {
                        if (result.status === 1) {
                            console.log("Posted");
                            handleClose();
                            window.location.reload();
                        }
                        if (result.status === 0) {
                            setAlertCard({ type: "error", status: true, msg: result.data });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                else if (props.variant === "update") {
                    PostService.updatePost(props.post_id, values)
                    .then(res => {
                        return res.json();
                    })
                    .then(result => {
                        if (result.status === 1) {
                            console.log("Updated");
                            console.log(result);
                            handleClose();
                            window.location.reload();
                        }
                        if (result.status === 0) {
                            setAlertCard({ type: "error", status: true, msg: result.data });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
        },1000);
        
    }

    const getPost = (id) => {
        PostService.getOnePost(id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setTitle(result.data.post_title);
                setBody(result.data.post_content);
                setPrice(result.data.post_product_price);
                if (result.data.post_status === 1) {
                    setChecked(false);
                    setPostButton("Post");
                }
                else {
                    setChecked(true);
                    setPostButton("Post Privately");
                }
                setPostStatus(result.data.post_status);
            }
            props.setLoadDraft(0);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (props.loadDraft === 1 && props.variant === "update") {
            getPost(props.post_id);
        }
    }, [props.loadDraft, props.variant,props.post_id, getPost]);


    return (
       <div id="post-editor-wrapper">
           <AlertCard severity={alertCard.type} id="editor-alert" 
                    display={alertCard.status} 
                    message={alertCard.msg} />
           <Modal id="post-editor-modal"
            open={props.openModal}
            >
           <Box id="post-editor-container">
               <form onSubmit={handleSubmit}>
               <ImageUploader />
               <div id="text-form">
               <InputBase id="title-input"
                    placeholder="Title" 
                    onChange={handleTitle} 
                    value={title}
                    disabled={disabled}
                fullWidth />
               <InputBase id="body-input"
                    placeholder="Your text here" 
                    onChange={handleBody} 
                    value={body}
                    multiline
                    rows={10}
                    disabled={disabled}
                fullWidth />
                <InputBase id="price-input"
                    placeholder="Price" 
                    onChange={handlePrice} 
                    value={price}
                    disabled={disabled}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                fullWidth />
                </div>
                <div id="buttons">
                    <Button name="close" variant="contained" onClick={handleClose} 
                    disabled={disabled}>Close</Button>

                    <Button type="submit" variant="contained" name="post"
                    disabled={disabled}>{postButton}</Button>

                    <div id="post-privacy">
                    <Checkbox
                        disabled={disabled}
                        icon={<LockOpenIcon />}
                        checkedIcon={<LockCloseIcon />}
                        onChange={handlePrivacy}
                        checked={checked}
                        />
                    </div>
                </div>
                </form>
           </Box>
           </Modal>
       </div>
    )
}

export default PostEditor;