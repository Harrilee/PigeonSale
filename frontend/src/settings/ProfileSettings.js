import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AlertCard from "../components/AlertCard";
import "./ProfileSettings.scss";
import AccountService from "../services/account.service";
import AvatarImageEditor from '../avatar-editor/AvatarImageEditor';

function ProfileSettings() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(localStorage.email);
    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [gender, setGender] = useState("Other");
    const [bio, setBio] = useState("");
    const [birthday, setBirthday] = useState("");
    const [prevValues, setPrevValues] = useState({});

    let resetErrors = {
        usernameError: { status: false, msg: "" },
        emailError: { status: false, msg: "" },
        birthdayError: { status: false, msg: "" },
        genderError: { status: false, msg: "" }
    }; // to show on form's error message

    const [errors, setErrors] = useState(resetErrors);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const handleEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handleUsername = (e) => {
        let username = e.target.value;
        setUsername(username);
    }

    const handleBio = (e) => {
        let bio = e.target.value;
        setBio(bio);
    }

    const handleDOB= (e) => {
        let dob = e.target.value;
        setBirthday(dob);
    }

    const handleGender = (e) => {
        let gender = e.target.value;
        setGender(gender);
    }

    const handleAvatar = (link) => {
        console.log(link);
        if (link.length === 0) {
            setAvatar("/default/empty-icon.png");
        }
        else {
            setAvatar(link);
        }
    }

    const getProfile = () => {
        const email = localStorage.email;
        setEmail(email)
        const request = {
            email : email
        };
        AccountService.getProfile(request, localStorage.usertype)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setPrevValues(result.data);
                setUsername(result.data.username);
                setGender(result.data.gender);
                if (result.data.bio.length !== 0) {
                    setBio(result.data.bio);
                }
                if (result.data.birthday.length !== 0) {
                    setBirthday(result.data.birthday);
                }
                if (result.data.avatar.length !== 0) {
                    setAvatar(result.data.avatar);
                }
            }
            else {
                if (result.code === "000" 
                    || result.code === "001"
                    || result.code === "002" ) {
                        setAlertCard({ type: "error", status: true, msg: result.msg });
                } 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(resetErrors);
        let values = {};

        if (birthday.length !== 0 && birthday !== prevValues.birthday) {
            values.birthday = birthday;
        }
        if (username.length !== 0 && username !== prevValues.username) {
            values.username = username;
        }
        if (email.length !== 0 && email !== prevValues.email) {
            values.email = email;
        }
        if (bio.length !== 0 && bio !== prevValues.bio) {
            values.bio = bio;
        }
        if (gender.length !== 0 && gender !== prevValues.gender) {
            values.gender = gender;
        }
        if (avatar !== "/default/empty-icon.png") {
            values.avatar = avatar;
        }
        else {
            values.avatar = "";
        }

        AccountService.updateProfile(values)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setAlertCard({ type: "success", status: true, msg: "Updated successfully" });
                if (values.username) {
                    localStorage.setItem("username", values.username);
                }
                if (values.email) {
                    localStorage.setItem("email", values.email);
                }
                if (values.avatar) {
                    localStorage.setItem("avatar", values.avatar);
                }
                else {
                    localStorage.setItem("avatar",avatar);
                }
            }
            if (result.status === 0) {
                setAlertCard({ type: "error", status: true, msg: result.msg });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (prevValues 
            && Object.keys(prevValues).length === 0 
            && Object.getPrototypeOf(prevValues) === Object.prototype) {
            getProfile();
        }
    }, []);


    return ( 
        <div id="tab-settings-wrapper" name="profile">
            <AlertCard severity={alertCard.type} id="profile-alert" 
                    display={alertCard.status}
                    message={alertCard.msg}
                    static={false} />
            <Box id="tab-settings-container">
            <h1>Profile Settings</h1>

            <AvatarImageEditor avatar={avatar} handleAvatar={handleAvatar} />

            <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Email"
                        onChange={handleEmail} 
                        value={email} 
                        error={errors.emailError.status}
                        helperText={errors.emailError.msg}
                        fullWidth  />

                    <TextField 
                        label="Username" 
                        onChange={handleUsername} 
                        value={username} 
                        error={errors.usernameError.status}
                        helperText={errors.usernameError.msg} 
                        fullWidth />

                    <FormControl sx={{ width: "calc(33.333% - 0.725em - 2px)" }} disabled>
                        <InputLabel>User Type</InputLabel>
                        <Select
                            value={localStorage.usertype}
                            label="Login As"
                        >
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"staff"}>Staff</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "calc(33.333% - 0.725em - 2px)" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            label="Gender"
                            onChange={handleGender}
                            error={errors.genderError.status}
                        >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                            
                    <TextField sx={{ width: "calc(33.333% - 0.725em - 2px)" }}
                        label="Date of Birth"
                        type="date"
                        value={birthday}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleDOB}
                        error={errors.birthdayError.status}
                    />

                    <TextField label="Bio" 
                        placeholder="Tell us about yourself" 
                        onChange={handleBio} 
                        value={bio}
                        multiline
                        rows={5}
                        fullWidth />
                    <Button type="submit" name="update" variant="contained">Update Profile</Button>
            </form>
            </Box>
        </div>
    )
}

export default ProfileSettings;