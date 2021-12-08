import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { Masonry } from "@mui/lab";
import { Box,Grid } from "@mui/material"

function PostGrid(props) {
    
    const [postList, setPostList] = useState(-1);

    const renderPosts = () => {
        if (postList.length > 0) {
            return postList.map((post,i) => {
                return <PostCard data={post} />
            });
        }
        else if (postList.length === 0) {
            return <React.Fragment>
                    <div className="center">&nsbp;</div>
                    <div className="center">
                        No posts
                    </div>
                    </React.Fragment>
        }
        else if (postList === 0) {
            return <div className="center">
                    Hm, something went wrong...
                </div>
        }
        return <React.Fragment>
            <div className="center"></div>
            <div className="center">
                Loading...
            </div>
        </React.Fragment>  
    }

    useEffect(() => {
        if (postList === -1) {
            setPostList(props.posts);
        }
    }, [props.posts, postList]);

    
    return (
        <div id="post-grid">
            {renderPosts()}
        </div> 
    )

}

export default PostGrid;