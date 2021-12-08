import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "./Chat.scss";
import ChatIcon from "../icons/ChatIcon";

function ChatButton(props) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        console.log(props.type);
        console.log("receiver:" + props.receiver_id);
        console.log("role:" + props.receiver_role);
        if (props.type === "post") {
            console.log("postid:" + props.post_id);
        }
    }

    if (props.type === "profile") {
        return (
        <React.Fragment>
        <Button id="chat-button" onClick={handleOpen} variant="contained"><ChatIcon /></Button>
        </React.Fragment>
        )
    }
    else if (props.type === "post") {    
        return (
            <React.Fragment>
            <Button id="chat-button" onClick={handleOpen} variant="outlined" fullWidth>Inquire</Button>
            </React.Fragment>
        )
    }
    return <React.Fragment/>
}

export default ChatButton;