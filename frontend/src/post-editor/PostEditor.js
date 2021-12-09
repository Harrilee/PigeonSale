import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, InputBase, InputAdornment, Modal, Checkbox } from "@mui/material";
import LockOpenIcon from '../icons/LockOpenIcon';
import LockCloseIcon from '../icons/LockCloseIcon';
import "./PostEditor.scss";
import PostService from "../services/post.service";
import AlertCard from '../components/AlertCard';
import ImageEditor from './ImageEditor';

function PostEditor(props) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState(-1);
    const [postButton, setPostButton] = useState("Post");
    const [checked, setChecked] = useState(false);
    const [postStatus, setPostStatus] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

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
        setImages([]);
    }

    const handleImageLinks = (links) => {
        setImages(links);
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
        setAlertCard({ type: "info", status: false, msg: "" });

        console.log(images);
        console.log(images !== -1 ? images : []);

        let values = {
            post_title: title,
            post_content: body,
            post_status: postStatus,
            post_images: images !== -1 ? images : [],
            post_product_price: parseFloat(price)
        };

        let condition = price.length === 0;
        let condition2 = title.length === 0 && body.length === 0;
        let condition3 = images === -1 || images.length === 0;
        let condition4 = parseFloat(price).toString() !== price.toString();

        let msg = "";

        if (condition) {
            msg +=  "Price ";
        }
        if (condition2) {
            msg += (msg.length > 0 ? ", " : "") + "Title or body ";
        }
        if (condition3) {
            msg += (msg.length > 0 ? ", " : "") + "Images ";
        }
        msg += msg.length > 0 ? "required" : "";

        if (!condition && condition4) {
            msg += (msg.length > 0 ? ", " : "") + "Price is not a number";
        }
        if (msg.length > 0) {
            setAlertCard({ type: "error", status: true, msg: msg });
        }
        

        setTimeout(() => {
            console.log((msg.length > 0));
            if (!(msg.length > 0)) {
                if (props.variant === "create") {
                    PostService.createPost(values)
                    .then(res => {
                        return res.json();
                    })
                    .then(result => {
                        if (result.status === 1) {
                            console.log("Posted");
                            setAlertCard({ type: "success", status: true, msg: "Posted successfully" });
                            handleClose();
                            window.location.reload();
                        }
                        if (result.status === 0) {
                            setAlertCard({ type: "error", status: true, msg: result.msg });
                            setDisabled(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setAlertCard({ type: "error", status: true, msg: "Something went wrong."});
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
                            setAlertCard({ type: "success", status: true, msg: "Updated successfully" });
                            handleClose();
                            window.location.reload();
                        }
                        if (result.status === 0) {
                            setAlertCard({ type: "error", status: true, msg: result.msg });
                            setDisabled(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setAlertCard({ type: "error", status: true, msg: "Something went wrong."});
                    });
                }
            }
            setDisabled(false);
        },3000);
    }

    const msg = "Post retrieved";

    const getPost = useCallback((id) => {
        PostService.getOnePost(id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setTitle(result.data.post_title);
                setBody(result.data.post_content);
                setPrice(result.data.post_product_price);
                if (result.data.post_images) {
                    setImages(result.data.post_images);
                }
                else {
                    setImages([]);
                }
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
    }, [msg]);

    useEffect(() => {
        if (props.loadDraft === 1 && props.variant === "update") {
            getPost(props.post_id);
        }
    }, [props, getPost]);


    return (
       <div id="post-editor-wrapper">
           <AlertCard severity={alertCard.type} id="editor-alert" 
                    display={alertCard.status} 
                    message={alertCard.msg}
                    static={false} />
           <Modal id="post-editor-modal"
            open={props.openModal}
            >
           <Box id="post-editor-container">
               <form onSubmit={handleSubmit}>
               <ImageEditor images={images} handleImageLinks={handleImageLinks} loadDraft={props.loadDraft} />
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

                    <div id="post-privacy" className="editor-button">
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