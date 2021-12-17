import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack , Divider, Modal,Button } from "@mui/material";
import "./Dashboard.scss";
import AdminService from '../services/admin.service';
import GenderIcon from '../icons/GenderIcon';
import AlertCard from '../components/AlertCard';

function RemoveUser(props) {

    const [openDelete, setOpenDelete] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const deleteUser = (id) => {
        if (props.type === "user") {
            AdminService.deleteUser(id)
            .then(res => res.json())
            .then(result => {
                if (result.status === 1) {
                    setOpenDelete(false);
                    window.location.reload();
                }
                else {
                    setAlertCard({ type: "error", status: false, msg: result.msg });
                }
            })
            .catch(err => {
                setAlertCard({ type: "error", status: false, msg: "Could not delete" });
            });
        }
        else if (props.type === "staff") {
            AdminService.deleteStaff(id)
            .then(res => res.json())
            .then(result => {
                if (result.status === 1) {
                    setOpenDelete(false);
                    window.location.reload();
                }
                else {
                    setAlertCard({ type: "error", status: false, msg: result.msg });
                }
            })
            .catch(err => {
                setAlertCard({ type: "error", status: false, msg: "Could not delete" });
            });
        }
    }

    return (
        <React.Fragment>
         <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Button variant="contained" onClick={() => setOpenDelete(true)}>Delete</Button>
        <Modal open={openDelete} id="delete-modal">
                            <Box id="delete-modal-container">
                                <h2 className="title">You are <span style={{color:"red"}}>removing</span> this {props.type}. Do you wish to continue?</h2>
                                
                                <div className="user-card-name">
                                <a href={"/" + props.type + "/"+props.user_id}>
                                    <div className="post-avatar center" style={{ backgroundImage: "url('"+ props.avatar + "')", backgroundSize: "100%" }}></div>
                                    <div className="post-author center">
                                        {props.username}
                                    </div>
                                </a>
                                </div>
                                <Button name="yes" variant="outlined" onClick={() => deleteUser(props.user_id, props.type)}>Yes</Button>
                                <Button name="no" variant="contained" onClick={() => { setOpenDelete(false) }}>No</Button>
                            </Box>
                </Modal>
        </React.Fragment>
        
    )
}

function UserCards(props) {

    const [users, setUsers] = useState(-1);

    useEffect(() => {
        if (users === -1 && props.loaded) {
            setUsers(props.users);
        }
    }, [props, users]);

    if (users === -1) {
        return (
            <div>Loading...</div>
        )
    }
    else if (users.length > 0) {
        return users.map((user,i) => {
            user.avatar = user.avatar.length > 0 ? user.avatar : "/default/empty-icon.png";
            return (
                <Box className="user-card left">
                    <div className="user-card-name">
                        {props.type === "staff" 
                        ?
                        <a href={"/staff/"+user.user_id}>
                            <div className={"post-avatar staff-avatar"} style={{ backgroundImage: "url('"+ user.avatar + "')", backgroundSize: "100%" }}></div>
                            <div className="post-author">
                                {user.username}
                            </div>
                        </a>
                        :
                        <a href={"/user/"+user.user_id}>
                            <div className={"post-avatar"} style={{ backgroundImage: "url('"+ user.avatar + "')", backgroundSize: "100%" }}></div>
                            <div className="post-author">
                                {user.username}
                            </div>
                        </a>}
                        
                    </div>
                    <div className="optional-info">
                    <Divider/><br/>
                        <div className="big"><GenderIcon type={user.gender} /></div>
                        <div><small>{user.birthday}</small></div>
                        <div><small><em>{user.bio}</em></small></div>
                    </div>
                <RemoveUser type={props.type} user_id={user.user_id} avatar={user.avatar} username={user.username} />
                </Box>
            )
        })
    }
    else if (users.length === 0) {
        return <div>No users</div>
    }
    return <div>Hm, something went wrong...</div>
    
}

function UserManager(props) {

    const [users, setUsers] = useState(-1);
    const [loaded, setLoaded] = useState(false);

    const getUsers = useCallback(() => {
        if (props.type === "user") {
                AdminService.getUsers()
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if (result.status === 1) {
                        setUsers(result.data.users);
                    }
                    else {
                        setUsers([])
                    }
                })
                .catch(err => {
                    setUsers(0)
                });
                setLoaded(true);
        }
        else if (props.type === "staff") {
            AdminService.getStaff()
            .then(res => {
                return res.json();
            })
            .then(result => {
                if (result.status === 1) {
                    setUsers(result.data.staffs);
                }
                else {
                    setUsers([])
                }
            })
            .catch(err => {
                setUsers(0)
            });
            setLoaded(true);
        }
    },[props.type]);

    useEffect(() => {
        if (users === -1 && props.isProfileLoaded) {
            getUsers();
            props.setDisabled(false);
        }
    }, [users, getUsers, props]);

    return (
        <div className="center">
        <Stack id="user-manager" spacing={2}>
        <UserCards type={props.type} users={users} loaded={loaded} />
        </Stack><br/>
        {props.type === "staff" ? <Button variant="outlined" onClick={() => window.location.href="/signup/staff"}>Add Staff</Button> : ""}
        </div>
    )
    
}

export default UserManager;