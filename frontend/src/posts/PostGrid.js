import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { Grid } from "@mui/material";

function PostGrid(props) {
    
    const [postList, setPostList] = useState(-1);

    const renderPosts = () => {
        if (postList.length > 0) {
            return postList.map((post,i) => {
                return <Grid item xs={2} sm={4} md={4} key={i}>
                        <PostCard data={post} /> 
                    </Grid>
            });
        }
        else if (postList.length === 0) {
            return <Grid item xs={2} sm={4} md={4} key={1}>
                    No posts
                </Grid>
        }
        else if (postList === 0) {
            return <Grid item xs={2} sm={4} md={4} key={1}>
                    Hm, something went wrong...
                </Grid>
        }
        return <Grid item xs={2} sm={4} md={4} key={1}>
                Loading...
            </Grid>    
    }

    useEffect(() => {
        if (postList === -1) {
            setPostList(props.posts);
        }
    }, [props.posts, postList]);

    
    return (
        <Grid container 
        id="post-grid"
        spacing={{ xs: 2, md: 4 }} 
        columns={{ xs: 4, sm: 8, md: 13 }}
        flow="column wrap"
        justifyContent="center"
        alignItems="justify"
        >
            {renderPosts()}
        </Grid> 
    )

}

export default PostGrid;