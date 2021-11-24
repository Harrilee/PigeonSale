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
        if (window.location.href.includes("dashboard")) {
            return (
                <React.Fragment>
                <UpdatePost post_id={props.data.post_id} />
                <DeletePost post_id={props.data.post_id} />
                </React.Fragment>
            )
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

    return (
        <Box className="post-container" id={"post-"+props.data.post_id}>
            <PrivacyNotif/>
            <a href={"/post/"+props.data.post_id}>
                <div className="post-images">
                    <img src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dweaaf3b70/images/C9/C90086-/1500x/C90086-++M_A.jpg" />
                </div>
            </a>
            <PostTitle/>
            <PostBody />
            <UserBar />
            <div className="post-bottom-bar">
                <div className="post-price">
                    ${props.data.post_product_price}
                </div>
                <EditorButtons />
            </div>
        </Box>
    )
}

export default PostCard;