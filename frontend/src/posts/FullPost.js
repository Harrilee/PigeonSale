import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PostService from "../services/post.service";
import "./FullPost.scss";
import TimeAgo from "../components/TimeAgo";
import UpdatePost from "../post-editor/UpdatePost";
import DeletePost from "../post-editor/DeletePost";
import ChatButton from "../chat/ChatButton";

function FullPost({ match }) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [images, setImages] = useState([]);
    const [post, setPost] = useState(-1);
    const { params: { post_id } } = match;

    const getPost = () => {
        PostService.getOnePost(post_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setPost(result.data);
                if (result.data.post_author_avatar.length !== 0) {
                    setAvatar(result.data.post_author_avatar);
                }
                setImages(result.data.post_images);
            }
            else {
                setPost(0);
                window.location.href = "/404";
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        if (post === -1) {
            getPost();
        }
    }, [getPost, post]);

    function EditorButtons() {
        if (localStorage.username === post.post_author_username && post.post_product_status !== 0) {
            return (
                <React.Fragment>
                <UpdatePost post_id={post.post_id} />
                <DeletePost post_id={post.post_id} />
                </React.Fragment>
            )
        }
        return (
            <React.Fragment/>
        )
    }

    function DealButtons() {
        if (post.post_product_status === 0) {
            return <Button variant="contained" fullWidth disabled >Sold</Button>
        }
        else {
            return (
            <React.Fragment>
                <Button variant="contained" fullWidth onClick={() => window.location.href+="/buy/user/"+localStorage.user_id}>Buy</Button>
                <ChatButton type="post" post_id={post_id} receiver_id={post.post_author_id} receiver_role="user" />
            </React.Fragment>
            )
        }
    }

    function PostPrice() {
        if (post.post_product_status === 0) {
            return <span><strike>${post.post_product_price}</strike></span>
        }
        return <span>${post.post_product_price}</span>
    }

    function PostImages() {
        if (images.length !== 0) {
            return (
            <div id="left-full-post-block"> 
                <div className="post-images">
                {images.map((item, i) => {
                    return <img src={item} alt={"image"+1}/>
                })}
                </div>
            </div>
            )
        }
        return <React.Fragment/>
    }


    return (
        <Box id="full-post-container" className="center">
            <PostImages/>
            <div id="right-full-post-block" className="left">
                <div className="post-title">
                <h1>{post.post_title}</h1>
                </div>
                <div className="post-content">
                    {post.post_content}
                </div>

                <div className="post-price">
                    <PostPrice />
                </div>
                <div className="post-user-bar">
                    <div className="post-author-card">
                        <a href={"/user/"+ post.post_author_id}>
                            <div className="post-avatar" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                            <div className="post-author">
                                {post.post_author_username}
                            </div>
                        </a>
                    </div>
                    <TimeAgo time={ { creation: post.post_creation_time, modified: post.post_modification_time } }/>
                </div>
                <div className="post-buttons">
                    <DealButtons />
                    <EditorButtons />
                </div>
            </div>
        </Box>
    )
}

export default FullPost;