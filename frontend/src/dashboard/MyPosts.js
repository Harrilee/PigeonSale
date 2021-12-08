import React, { useEffect, useState } from 'react';
import PostService from "../services/post.service";
import PostGrid from '../posts/PostGrid';
import AuthService from '../services/auth.service';

function MyPosts(props) {

    const [myPosts, setMyPosts] = useState(-1);

    const getMyPosts = () => {
        PostService.getMyPosts()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setMyPosts(result.data.reverse());
            }
            else {
                setMyPosts(0);
                if (result.code === "009") {
                    handleLogout();
                } 
            }
            props.setDisabled(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleLogout  = () => {
        AuthService.clearStorage()
    }

    useEffect(() => {
        if (myPosts === -1 && props.isProfileLoaded) {
            getMyPosts();
        }
    });

    return (
        <PostGrid posts={myPosts} />
    )
}

export default MyPosts;