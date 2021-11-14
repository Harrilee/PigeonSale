import React, { useEffect, useState } from 'react';
import AccountService from "../services/account.service";

function PublicPosts() {

    const [publicPosts, setPublicPosts] = useState(-1);

    const getPublicPosts = () => {
        AccountService.getPublicPosts(localStorage.user_id)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            console.log(result);
            if (result.status === 1) {
                setPublicPosts(result.data)
            }
            else {
                setPublicPosts(0);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    // useEffect(() => {
    //     if (publicPosts === -1) {
    //         console.log("initialize");
    //         getPublicPosts();
    //     }
    // });

    if (publicPosts.length > 0) {
        return ( 
            <div id="public-posts">
                There are posts!
            </div>
        )
    }
    else if (publicPosts.length === 0) {
        return ( 
            <div id="public-posts">
                No posts
            </div>
        )
    }
    return ( 
        <div id="public-posts">
        Hm... something went wrong
        </div>
    )
}

export default PublicPosts;