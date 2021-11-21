import React, { useEffect, useState } from 'react';
import PostService from '../services/post.service';
import PostGrid from './PostGrid';

function SearchPosts({ match }) {

    const [searchPosts, setSearchPosts] = useState(-1);
    const { params: { keyword } } = match;

    const getSearchPosts = () => {
        PostService.searchPost(keyword)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            console.log(result);
            if (result.status === 1) {
                setSearchPosts(result.data)
            }
            else {
                setSearchPosts(0);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (searchPosts === -1) {
            getSearchPosts();
        }
    });

    return (
        <div id="basic-grid-container">
            <h2 className="title center">{searchPosts.length} result(s) found for <em>{keyword}</em></h2>
            <PostGrid posts={searchPosts} />
        </div>
    )
}

export default SearchPosts;