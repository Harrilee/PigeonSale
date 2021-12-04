import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import GenderIcon from '../icons/GenderIcon';

function ProfileCard(props) {

    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [loaded, setLoaded] = useState(false);

    function UserBadge() {
        if (props.usertype === "staff") {
            return <div className="staff-badge">Staff</div>
        }
        else if (props.usertype === "admin") {
            return <div className="admin-badge">Admin</div>
        }
        return <React.Fragment/>
    }

    useEffect(() => {
        if (!loaded) {
            if (props.data.avatar) {
                setAvatar(props.data.avatar);
                setLoaded(true);
            }
        }
    }, [props.data, loaded, avatar]);

    return ( 
        <div className={props.usertype + "-card"}>
                <div id="avatar-card">
                    <div id="avatar">
                        <div id="avatar-image" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                    </div>
                    <div id="username">
                        <h1>{props.data.username}</h1> <UserBadge />
                        <div className="optional-info">
                        <GenderIcon type={props.data.gender} />
                        <small>{props.data.birthday}</small>
                        </div>
                    </div>
                </div>
                <div id="profile-desc">
                    {props.data.bio}
                </div>
        </div>
    )
}

export default ProfileCard;