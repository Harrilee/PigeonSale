import React, { useEffect, useState } from 'react';
import PostService from "../services/post.service";
import PostGrid from '../posts/PostGrid';

function MyPosts(props) {

    const [myPosts, setMyPosts] = useState(-1);

    const getMyPosts = () => {
        PostService.getMyPosts()
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            console.log(result);
            if (result.status === 1) {
                setMyPosts(result.data.reverse())
            }
            else {
                setMyPosts(0);
            }
        })
        .catch(err => {
            console.log(err);
        });
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