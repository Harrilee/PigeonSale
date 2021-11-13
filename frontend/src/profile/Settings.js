import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AlertCard from "../components/AlertCard";
import "./Profile.scss";
import AccountService from "../services/account.service";

function Settings() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(localStorage.email);
    const [avatar, setAvatar] = useState("/default/empty-icon.png");
    const [gender, setGender] = useState(2);
    const [bio, setBio] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [prevValues, setPrevValues] = useState({});

    let resetErrors = {
        updateError: { status: false, msg: "" },
        usernameError: { status: false, msg: "" },
        passwordError: { status: false, msg: "" },
        emailError: { status: false, msg: "" },
        birthdayError: { status: false, msg: "" },
        genderError: { status: false, msg: "" }
    }; // to show on form's error message

    const [errors, setErrors] = useState(resetErrors);

    const handleEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handleUsername = (e) => {
        let username = e.target.value;
        setUsername(username);
    }

    const handlePassword = (e) => {
        let password = e.target.value;
        setPassword(password);
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

    const getProfile = () => {
        const usertype = localStorage.usertype;
        const email = localStorage.email;
        setEmail(email)
        const request = {
            email : email
        };
        AccountService.getProfile(request)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setPrevValues(result.data);
                setUsername(result.data.username);
                if (result.data.gender) {
                    setGender(result.data.gender)
                }
                if (result.data.bio) {
                    setBio(result.data.bio);
                }
                if (result.data.birthday) {
                    setGender(result.data.birthday);
                }
            }
            else {
                if (result.code === "000" 
                    || result.code === "001"
                    || result.code === "002" ) {
                        setErrors({...errors, loginError: { status: true, msg: result.msg } });
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

        console.log("Form submitted");

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
        if (password.length !== 0 && password !== prevValues.password) {
            values.password = password;
        }

        console.log("Values submitted: ", values);

        AccountService.updateProfile(values)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                console.log("update success");
            }
            if (result.status === 0) {
                console.log(result);
                setErrors({...errors, updateError: { status: true, msg: result.msg } });
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

    useEffect(() => {
        if (prevValues && Object.keys(prevValues).length === 0 && Object.getPrototypeOf(prevValues) === Object.prototype) {
            console.log("initialize");
            getProfile();
        }
    });


    return ( 
        <div id="profile-wrapper" name="settings">
            <AlertCard severity="error" id="profile-error" 
                    display={errors.updateError.status} 
                    message={errors.updateError.msg} />
            <Box id="profile-container">
            <h1>Account Settings</h1>
            <div id="avatar">
                <div id="avatar-image" style={{ backgroundImage: "url('"+ avatar + "')", backgroundSize: "100%" }}></div>
            </div>
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
                    <TextField 
                        label="Password" 
                        type="password"
                        onChange={handlePassword} 
                        value={password} 
                        error={errors.passwordError.status}
                        helperText={errors.passwordError.msg}
                        fullWidth
                    />

                    <FormControl  sx={{ width: "calc(33.333% - 0.725em - 2px)" }} disabled>
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

export default Settings;