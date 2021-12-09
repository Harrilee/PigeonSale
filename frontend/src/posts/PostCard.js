import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./PostCard.scss";
import UpdatePost from "../post-editor/UpdatePost";
import DeletePost from "../post-editor/DeletePost";
import LockCloseIcon from "../icons/LockCloseIcon";

function PostCard(props) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [loadPost, setLoadPost] = useState(false);
    
    useEffect(() => {
        if (!loadPost) {
            if (props.data.post_author_avatar.length !== 0) {
                setAvatar(props.data.post_author_avatar);
            }
            setLoadPost(true);
        }
    }, [loadPost, props.data.post_author_avatar]);

    function UserBar() {
        if (!(window.location.href.includes("dashboard") || window.location.href.includes("user"))) {
            return (
                <div className="post-user-bar">
                    <a href={"/user/"+props.data.post_author_id}>
                        <div className="post-avatar" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                            {props.data.post_author_username}
                        </div>
                    </a>
                </div>
            )
        }
        return (
            <React.Fragment/>
        )
    }

    function EditorButtons() {
        if (window.location.href.includes("dashboard") && props.data.post_product_status !== 0) {
            return (
                <React.Fragment>
                <UpdatePost post_id={props.data.post_id} />
                <DeletePost post_id={props.data.post_id} />
                </React.Fragment>
            )
        }
        else if (window.location.href.includes("/user/") && props.data.post_product_status !== 0 && localStorage.usertype === "staff") {
            return <DeletePost post_id={props.data.post_id} />
        }
        return (
            <React.Fragment/>
        )
    }

    function PostTitle() {
        if (props.data.post_title.length !== 0) {
            return (
                <div className="post-title">
                <h2>{props.data.post_title}</h2>
                </div>
                
            )
        }
        return <React.Fragment/>
    }

    function PostBody() {
        if (props.data.post_content.length !== 0) {
            return (
                <div className="post-content">
                {props.data.post_content}
                </div>
            )
        }
        return <React.Fragment/>
    }

    function PrivacyNotif() {
        if (props.data.post_status === 2) {
            return (
                <div className="privacy">
                    <LockCloseIcon /> Private
                </div>
            )
        }
        return <React.Fragment/>
    }

    function PostImage() {
        if (props.data.post_images.length !== 0) {
            if (props.data.post_product_status === 0) {
                return (<div className="image-wrapper">
                <div className="sold"><h3>SOLD</h3></div>
                <img src={props.data.post_images[0]} alt={"post-card-"+props.data.post_id} />
            </div>)
            }
            return (<div className="image-wrapper">
                <img src={props.data.post_images[0]} alt={"post-card-"+props.data.post_id} />
            </div>)
        }
        if (props.data.post_images.length === 0) {
            if (props.data.post_product_status === 0) {
                return (<div className="image-wrapper">
                <div className="sold"><h3>SOLD</h3></div>
            </div>)
            }
            return <React.Fragment/>
        }
    }

    function PostPrice() {
        if (props.data.post_product_status === 0) {
            return <span><strike>${props.data.post_product_price}</strike></span>
        }
        return <span>${props.data.post_product_price}</span>
    }

    return (
        <Box className="post-container" id={"post-"+props.data.post_id}>
            <PrivacyNotif/>
            <a href={"/post/"+props.data.post_id}>
                <div className="post-images">
                <PostImage/>
                </div>
            </a>

            <a href={"/post/"+props.data.post_id}>
            <PostTitle/>
            <PostBody />
            </a>
            <UserBar />
            <div className="post-bottom-bar">
                <div className="post-price">
                    <PostPrice />
                </div>
                <EditorButtons />
            </div>
        </Box>
    )
}

export default PostCard;