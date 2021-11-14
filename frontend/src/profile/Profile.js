import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import "./Profile.scss";
import AccountService from "../services/account.service";
import PublicPosts from '../posts/PublicPosts';

function Profile() {

    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [birthday, setBirthday] = useState("");
    const [usertype, setUsertype] = useState("");
    const [loaded, setLoaded] = useState(false);

    const getProfile = () => {
        const usertype = localStorage.type;
        const email = localStorage.email;
        const request = {
            email : email
        };
        AccountService.getProfile(request)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            setUsername(result.data.username);
            setGender(result.data.gender);
            setUsertype(result.data.usertype);
            if (result.data.avatar.length !== 0) {
                setAvatar(result.data.avatar);
            }
            if (result.data.bio.length !== 0) {
                setBio(result.data.bio);
            }
            if (result.data.birthday !== null) {
                setBirthday(result.data.birthday);
            }
            console.log(result.data);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (username.length === 0) {
            getProfile();
        }
    });


    return ( 
        <div id="profile-wrapper">
            <Box id="profile-container">
                <div id="avatar-card">
                    <div id="avatar">
                        <div id="avatar-image" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                    </div>
                    <div id="username">
                        <h1>{username}</h1>
                        <small>{birthday}</small>
                        <small>{gender}</small>
                        <small>{usertype}</small>
                    </div>
                </div>
                <div id="profile-desc">
                    {bio}
                </div>
                <div id="my-posts">
                    <PublicPosts isProfileLoaded={loaded} />
                </div>
            </Box>
        </div>
    )
}

export default Profile;