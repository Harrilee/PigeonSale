import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
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
            <img className={'avatar'} src={avatar}/>
        </div>
    )
}

const OthersMessage = (props) => {
    const {msg, avatar, time} = props
    return (
        <div className="msg_container others_msg_container">
            <div className={'container_time_msg other_container_time_msg'}>
                <img className={'avatar'} src={avatar}/>
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
    const {r_id, r_role, post_id, setOpen, open} = props;
    const [chatData, setChatData] = React.useState(null)
    const getData = (r_id, r_role, post_id) => {
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
            console.log(result)
            if (JSON.stringify(chatData) !== JSON.stringify(result.data)) {
                setChatData(result.data)
            }
        });
    }
    const handleClose = () => {
        setOpen(false)
    }
    var getMsg
    const handleSend = () => {
        let msg = document.getElementById('msg2send').value
        document.getElementById('msg2send').value = ''
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
            }
        });
    }
    getData(r_id, r_role, post_id);
    React.useState(()=>{
        clearInterval(getMsg)
        getMsg = setInterval(getData, 1000, r_id, r_role, post_id);
    })

    if (!chatData)
        return <React.Fragment/>
    let rendered_dates = []
    let show_date = false;
    return (
        <div className={open ? "chat_border chat_border_show" : "chat_border chat_border_hide"}>
            <div className={'chat_title'}>
                <span>{chatData.receiver.username}</span>
                <span style={{fontWeight: 'bold'}}><a onClick={handleClose}>✕</a></span>
            </div>
            <hr className={'chat_separator'}/>
            <div className={'chat_body'}>
                {chatData.message.map(d => {
                    let send_time = moment(d.send_time, "YYYY-MM-DD hh:mm:ss")
                    let cur_time = moment()
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
            <hr className={'chat_separator'}/>
            <div className={'chat_input_box'}>
                <textarea id={'msg2send'} data-gramm="false"/>
                <Button className="send_button" onClick={handleSend} variant="contained">Send</Button>
            </div>
        </div>
    )


    return <React.Fragment/>
}

export default ChatBox;