import React, { useCallback, useEffect } from "react";
import { Button, Modal, InputBase } from "@mui/material";
import "./Chat.scss";
import moment from 'moment';

const CHAT_URL = "http://localhost:5000/msg";

const MyMessage = (props) => {
    const {msg, avatar, time} = props
    return (
        <div className="msg_container my_msg_container">
            <div className={'container_time_msg my_container_time_msg'}>
                <span className={"chat_time"}>{time}</span>
                <div className="msg_style my_msg_style">
                    {msg}
                </div>
            </div>
            <img alt="avatar_chatbox_my" className={'avatar'} src={avatar}/>
        </div>
    )
}

const OthersMessage = (props) => {
    const {msg, avatar, time} = props
    return (
        <div className="msg_container others_msg_container">
            <div className={'container_time_msg other_container_time_msg'}>
                <span className={"chat_time"}>{time}</span>
                <img alt="avatar_chatbox_other" className={'avatar'} src={avatar}/>
                <div className="msg_style others_msg_style">
                    {msg}
                </div>
            </div>
        </div>
    )
}

const Prompt = (props) => {
    const {text} = props;
    return (
        <div style={{width:'100%', display:'flex', }}>
            <span style={{margin:'auto', borderRadius:'2px', background:'rgb(218, 218, 218)', color:'white',
                fontSize:'smaller', padding:'2px'}}>
                {text}
            </span>
        </div>
    )
}

const ChatBox = (props) => {
    const {r_id, r_role, post_id } = props;
    const [chatData, setChatData] = React.useState(null);
    const [currentInterval,setCurrentInterval] = React.useState(null);

    const getData = useCallback((r_id, r_role, post_id) => {
        const values = {r_uid: r_id, r_role: r_role, post_id: post_id};
        const uri = Object.keys(values).map((k) => {
            return k + "=" + encodeURIComponent(values[k]);
        }).join("&");
        fetch(CHAT_URL + "?" + uri, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(res => {
            return res.json()
        }).then(result => {
            if (JSON.stringify(chatData) !== JSON.stringify(result.data)) {
                setChatData(result.data)
            }
        });
    }, [chatData, setChatData]);

    const scrollDown = () => {
        const chatdiv = document.getElementById("chat_messages");
        const chatdivwrap = document.getElementById("chat_body_wrap");
        chatdivwrap.scrollTop = chatdiv.scrollHeight;
    }

    const handleClose = () => {
        scrollDown();
        props.setOpen(false);
        clearInterval(currentInterval);
        setCurrentInterval(null);
    }

    const handleSend = () => {
        let msg = document.getElementById('msg2send').value
        document.getElementById('msg2send').value = '';

        fetch(CHAT_URL, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    r_uid: r_id, r_role: r_role, post_id: post_id, msg: msg
                })
            }
        ).then(res => {
            return res.json()
        }).then(result => {
            if (JSON.stringify(chatData) !== JSON.stringify(result.data)) {
                setChatData(result.data, Date())
                scrollDown();
            }
        });
    }

    useEffect(() => {
        if (props.open && !currentInterval) {
            const intervalId= setInterval(getData, 1000, r_id, r_role, post_id);
            setCurrentInterval(intervalId);
        }
    }, [currentInterval, props.open, getData, post_id, r_id, r_role ]);

    if (!chatData)
        return <React.Fragment/>
    let rendered_dates = []
    let show_date = false;

    return (
        <Modal open={props.open} >
        <div className={props.open ? "chat_border chat_border_show" : "chat_border chat_border_hide"}>
            <div className={'chat_title'}>
                <span>{chatData.receiver.username}</span>
                <span style={{fontWeight: 'bold'}}><span onClick={handleClose}>✕</span></span>
            </div>
            <hr className={'chat_separator'}/>
            <div id="chat_body_wrap" className={'chat_body'}>
                <div id="chat_messages">
                {chatData.message.map(d => {
                    let send_time = moment(d.send_time, "YYYY-MM-DD hh:mm:ss")
                    if (!rendered_dates.includes(send_time.format("YYYY-MM-DD"))) {
                        rendered_dates.push(send_time.format("YYYY-MM-DD"))
                        show_date = true
                    } else {
                        show_date = false
                    }
                    return (
                        <>
                            {
                                show_date ? <Prompt text={send_time.format("YYYY-MM-DD")} /> : <></>
                            }
                            {
                                d.is_send === true ?
                                    <MyMessage msg={d.msg} avatar={chatData.sender.avatar}
                                               time={send_time.format("hh:mm")}/>
                                    :
                                    <OthersMessage msg={d.msg} avatar={chatData.receiver.avatar}
                                                   time={send_time.format("hh:mm")}/>
                            }
                        </>
                    )
                })}
                </div>
            </div>
            <hr className={'chat_separator'}/>
            <div className={'chat_input_box'}>
                <InputBase id={'msg2send'} data-gramm="false"/>
                <Button className="send_button" onClick={handleSend} variant="contained">Send</Button>
            </div>
            </div>
        </Modal>
    )
}

export default ChatBox;