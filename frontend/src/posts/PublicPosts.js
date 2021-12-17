import React, { useEffect, useState } from 'react';
import AccountService from "../services/account.service";
import PostGrid from './PostGrid';

function PublicPosts(props) {

    const [publicPosts, setPublicPosts] = useState(-1);

    const getPublicPosts = () => {
        AccountService.getPublicPosts(props.user_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setPublicPosts(result.data.reverse());
            }
            else {
                setPublicPosts(0);
            }
            props.setDisabled(false);
        })
        .catch(err => {
            setPublicPosts(0);
        });
    }

    useEffect(() => {
        if (publicPosts === -1 && props.isProfileLoaded) {
            props.setDisabled(true);
            getPublicPosts();
        }
    });

    return (
        <PostGrid posts={publicPosts} />
    )
}

export default PublicPosts;