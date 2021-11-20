import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import GenderIcon from '../icons/GenderIcon';

function ProfileCard(props) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            if (props.data.avatar) {
                setAvatar(props.data.avatar);
                setLoaded(true);
            }
        }
    }, [props.data]);

    return ( 
        <div>
                <div id="avatar-card">
                    <div id="avatar">
                        <div id="avatar-image" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                    </div>
                    <div id="username">
                        <h1>{props.data.username} <GenderIcon type={props.data.gender} /></h1>
                        <small>{props.data.usertype}</small> <small>{props.data.birthday}</small>
                    </div>
                </div>
                <div id="profile-desc">
                    {props.data.bio}
                </div>
        </div>
    )
}

export default ProfileCard;