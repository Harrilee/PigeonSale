import React, { useEffect, useState } from 'react';
import PostService from "../services/post.service";
import PostGrid from '../posts/PostGrid';

function Index() { 
    const [indexPosts, setIndexPosts] = useState(-1);

    const getIndexPosts = () => {
        PostService.getIndexPosts()
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setIndexPosts(result.data);
            }
            else {
                setIndexPosts(0);
            }
        })
        .catch(err => {
            setIndexPosts(0);
        })
    }

    useEffect(() => {
        if (indexPosts === -1) {
            getIndexPosts();
        }
    });

    if (localStorage.usertype === "admin" && localStorage.isLoggedIn === "true") {
        window.location.href="/dashboard";
    }
    return (
        <div id="basic-grid-container">
            <h2 className="title center">Recent Activity</h2>
            <PostGrid posts={indexPosts} />
        </div>
    )
    
}

export default Index;