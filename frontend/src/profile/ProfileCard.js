import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import GenderIcon from '../icons/GenderIcon';
import ChatButton from '../chat/ChatButton';

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
                console.log(props.data)
                setLoaded(true);
            }
        }
    }, [props.data, loaded, avatar]);

    return ( 
        <div className={props.usertype + "-card"}>
                <ChatButton type="profile" receiver_id={props.user_id} receiver_role={props.usertype} />
                <div id="avatar-card">
                    <div id="avatar">
                        <div id="avatar-image" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
                    </div>
                    <div id="username">
                        <h1>{props.data.username}</h1> <UserBadge />
                        { props.data.gender !== "Other" || props.data.birthday ? <div className="optional-info">
                            <div className="big">
                            <GenderIcon type={props.data.gender} />
                            </div>
                            <div>
                                <small>{props.data.birthday}</small>
                            </div>
                        </div>
                        : <React.Fragment/>
                        }
                    </div>
                </div>
                <div id="profile-desc">
                    {props.data.bio}
                </div>
        </div>
    )
}

export default ProfileCard;