import React, { useEffect, useState } from 'react';
import PostService from '../services/post.service';
import PostGrid from './PostGrid';

function SearchPosts({ match }) {

    const [searchPosts, setSearchPosts] = useState(-1);
    const [searchText, setSearchText] = useState("Searching for ");
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
                setSearchPosts(result.data);
                setSearchText(result.data.length + " result(s) found for ");
            }
            else {
                setSearchText(0 + " result(s) found for ");
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
            <h2 className="title center">{searchText} <em>{keyword}</em></h2>
            <PostGrid posts={searchPosts} />
        </div>
    )
}

export default SearchPosts;