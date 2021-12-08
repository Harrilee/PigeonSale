import React, { useEffect, useState } from 'react';
import AccountService from "../services/account.service";
import PostGrid from './PostGrid';

function PublicPosts(props) {

    const [publicPosts, setPublicPosts] = useState(-1);

    const getPublicPosts = () => {
        AccountService.getPublicPosts(props.user_id)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            console.log(result);
            if (result.status === 1) {
                setPublicPosts(result.data.reverse())
            }
            else {
                setPublicPosts(0);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (publicPosts === -1 && props.isProfileLoaded) {
            console.log("initialize");
            getPublicPosts();
        }
    });

    return (
        <PostGrid posts={publicPosts} />
    )
}

export default PublicPosts;