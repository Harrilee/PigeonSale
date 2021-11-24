import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import "./Profile.scss";
import AccountService from "../services/account.service";
import PublicPosts from '../posts/PublicPosts';
import ProfileCard from './ProfileCard';

function Profile({ match }) {

    const { params: { user_id } } = match;
    const [profile, setProfile] = useState("");
    const [loaded, setLoaded]= useState(false);

    const getProfile = () => {
        const request = {
            user_id : user_id
        };
        AccountService.getProfile(request)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setProfile(result.data);
                setLoaded(true);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (profile.length === 0) {
            getProfile();
        }
    });

    if (user_id !== localStorage.user_id) {
        return ( 
            <div id="profile-wrapper">
                <Box id="profile-container">
                    <ProfileCard data={profile} />
                    <div id="public-posts">
                        <h2 className="title center">Shop</h2>
                        <PublicPosts isProfileLoaded={loaded} user_id={user_id} />
                    </div>
                </Box>
            </div>
        )
    }
    else {
        window.location.href="/dashboard";
    }
}

export default Profile;