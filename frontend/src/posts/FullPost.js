import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PostService from "../services/post.service";
import "./FullPost.scss";
import TimeAgo from "../components/TimeAgo";
import UpdatePost from "../post-editor/UpdatePost";
import DeletePost from "../post-editor/DeletePost";

function FullPost({ match }) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
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
            }
            else {
                setPost(0);
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
    }, [getPost]);

    function EditorButtons() {
        if (localStorage.username === post.post_author_username) {
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

    return (
        <Box id="full-post-container">
            <div id="left-full-post-block"> 
                <div className="post-images">
                    <img src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dweaaf3b70/images/C9/C90086-/1500x/C90086-++M_A.jpg" />
                </div>
            </div>
            <div id="right-full-post-block">
                <div className="post-title">
                <h1>{post.post_title}</h1>
                </div>
                <div className="post-content">
                    {post.post_content}
                </div>

                <div className="post-price">
                    ${post.post_product_price}
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
                    <Button variant="contained" fullWidth>Buy</Button>
                    <Button variant="outlined" fullWidth>Deal</Button>
                    <EditorButtons />
                </div>
            </div>
        </Box>
    )
}

export default FullPost;