import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

function PostGrid(props) {
    
    const [postList, setPostList] = useState(-1);

    const renderPosts = () => {
         if (postList.length > 0) {
            return postList.map((post,i) => {
                return <PostCard data={post} key={i} />
            });
        }
        else if (postList.length === 0) {
            return <React.Fragment>
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

    if (postList !== -1) {
        return <div id="post-grid" 
                spacing={{ xs: 1, sm: 2, md: 3 }}
                columns={{ xs: 1, sm: 2, md: 3 }}>
                    {renderPosts()}
            </div> 
    }
    return <React.Fragment/>

}

export default PostGrid;