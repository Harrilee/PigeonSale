import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./PostCard.scss";

function PostCard(props) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [loadPost, setLoadPost] = useState(false);
    
    useEffect(() => {
        if (!loadPost) {
            if (props.data.post_author_avatar.length !== 0) {
                setAvatar(props.data.post_author_avatar);
            }
            setLoadPost(true);
        }
    }, [loadPost, props.data.post_author_avatar]);

    function Topbar() {
        if (!window.location.href.includes("user")) {
            return (
                <div className="post-topbar">
                    <a href={"/user/"+props.data.post_author_id}>
                        <div className="post-avatar" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                            {props.data.post_author_username}
                        </div>
                    </a>
                </div>
            )
        }
        return (
            <React.Fragment/>
        )
    }

    return (
        <Box className="post-container" id={"post-"+props.data.post_id}>
            <Topbar />
            <a href={"/post/"+props.data.post_id}>
                <div className="post-images">
                    <img src="https://www.acnestudios.com/on/demandware.static/-/Sites-acne-product-catalog/default/dweaaf3b70/images/C9/C90086-/1500x/C90086-++M_A.jpg" />
                </div>
            </a>
            <div className="post-title">
                <h2>{props.data.post_title}</h2>
            </div>
            <div className="post-content">
                {props.data.post_content}
            </div>
            <div className="post-bottombar">
                <div className="post-price">
                    ${props.data.post_product_price}
                </div>
            </div>
        </Box>
    )
}

export default PostCard;