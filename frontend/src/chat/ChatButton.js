import React, { useState } from "react";
import { Button } from "@mui/material";
import "./Chat.scss";
import ChatIcon from "../icons/ChatIcon";
import ChatBox from "./ChatBox"

function ChatButton(props) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    if (localStorage.isLoggedIn) {
        if (props.type === "profile") {
            return (
                <React.Fragment>
                    <Button id="chat-button" onClick={handleOpen} variant="contained"><ChatIcon/></Button>
                    {open ? <ChatBox
                        r_id={props.receiver_id} r_role={props.receiver_role}
                        post_id={props.type === 'post' ? props.post_id : null}
                        setOpen={setOpen} open={open}
                    /> : ""}
                </React.Fragment>
            )
        } else if (props.type === "post") {
            console.log(props)
            return (
                <React.Fragment>
                    <Button id="chat-button" onClick={handleOpen} variant="outlined" fullWidth>Inquire</Button>
                    {open ? <ChatBox
                        r_id={props.receiver_id} r_role={props.receiver_role}
                        post_id={props.type === 'post' ? props.post_id : null}
                        setOpen={setOpen} open={open}
                    /> : ""}
                </React.Fragment>
            )
        }
    }
    return <React.Fragment/>
}

export default ChatButton;