import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import LogoCard from "../components/LogoCard";
import AlertCard from "../components/AlertCard";
import AuthService from "../services/auth.service";
import './Register.scss';

function Signup() {
    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
        gender: "",
        birthday: "",
        bio: ""
    });
    
    const [usertype,setUserType]=useState("");
    const [scrolling,setScroll]=useState("scroll1");

    let resetErrors = {
        loginError: { status: false, msg: "" },
        usernameError: { status: false, msg: "" },
        emailError: { status: false, msg: "" },
        passwordError: { status: false, msg: "" },
        password2Error: { status: false, msg: "" },
        usertypeError: { status: false, msg: "" },
        birthdayError: { status: false, msg: "" },
        genderError: { status: false, msg: "" }
    }; // to show on form's error message

    const [errors, setErrors] = useState(resetErrors);

    const handleEmail = (e) => {
        let email = e.target.value;
        setValues({ ...values, email: email });
    }

    const handlePassword = (e) => {
        let password = e.target.value;
        setValues({ ...values, password: password });
    }

    const handlePassword2 = (e) => {
        let password2 = e.target.value;
        setValues({ ...values, password2: password2 });
    }

    const handleUsername = (e) => {
        let username = e.target.value;
        setValues({ ...values, username: username });
    }

    const handleBio = (e) => {
        let bio = e.target.value;
        setValues({ ...values, bio: bio });
    }

    const handleDOB= (e) => {
        let dob = e.target.value;
        setValues({ ...values, birthday: dob });
    }

    const handleGender = (e) => {
        let gender = e.target.value;
        setValues({ ...values, gender: gender });
    }

    const handleUserType = (e) => {
        let usertype = e.target.value;
        setUserType(usertype);
    }

    const handleScroll = () => {
        setErrors(resetErrors);
        let hasError = false;
        if (scrolling === "scroll1") {
            if (values.email.length === 0) {
                setErrors({...errors, emailError: { status: true, msg: "Required field"} });
                hasError=true;
            }
            else if (values.email.includes("@") === false) {
                setErrors({...errors, emailError: { status: true, msg: "Not a valid email"} });
                hasError=true;
            }
            else if (values.username.length === 0) {
                setErrors({...errors, usernameError: { status: true, msg: "Required field"} });
                hasError=true;
            }
            else if (values.password.length === 0) {
                setErrors({...errors, passwordError: { status: true, msg: "Required field"} });
                hasError=true;
            }
            else if (values.password !== values.password2) {
                setErrors({...errors, password2Error: { status: true, msg: "Passwords don't match"} });
                hasError=true;
            }
            else if (usertype.length === 0) {
                setErrors({...errors, usertypeError: { status: true, msg: "Required field"} });
                hasError=true;
            }
            if (!hasError) {
                setScroll("scroll2");
            }
        }
        else {
            setScroll("scroll1");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(resetErrors);

        console.log("Form submitted");

        let cleanedValues = JSON.parse(JSON.stringify(values)); // clone values

        delete cleanedValues.password2; // only used as verification
        // remove optional parameters if it does not exist
        if (cleanedValues.gender.length === 0) {
            delete cleanedValues.gender;
        }
        if (cleanedValues.birthday.length === 0) {
            delete cleanedValues.birthday;
        }
        if (cleanedValues.bio.length === 0) {
            delete cleanedValues.bio;
        }
        
        AuthService.signup(cleanedValues, usertype)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                console.log("Sign up success");
                window.location.href="/";
            }
            if (result.status === 0) {
                console.log(result);
                setErrors({...errors, loginError: { status: true, msg: result.msg } });
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

    if (localStorage.isLoggedIn === "true") {
        console.log("Already logged in");
        window.location.href="./";
    }
    else {
        return (
            <div id="register-wrapper" name="signup">
                <Box id="register-container">
                    <AlertCard severity="error" id="register-error" 
                    display={errors.loginError.status} 
                    message={errors.loginError.msg} />

                    <LogoCard title="Sign Up" position="center" size="medium" />

                    <form className='multiform' onSubmit={handleSubmit}>
                        
                        <div id="form1" className={"form-block "+scrolling}>
                            <TextField 
                                label="Email" 
                                onChange={handleEmail} 
                                value={values.email} 
                                error={errors.emailError.status}
                                helperText={errors.emailError.msg}
                                fullWidth  />

                            <TextField 
                                label="Username" 
                                onChange={handleUsername} 
                                value={values.username} 
                                error={errors.usernameError.status}
                                helperText={errors.usernameError.msg} 
                                fullWidth />

                            <TextField 
                                label="Password" 
                                type="password"
                                onChange={handlePassword} 
                                value={values.password} 
                                error={errors.passwordError.status}
                                helperText={errors.passwordError.msg}
                            />

                            <TextField 
                                label="Confirm Password" 
                                type="password"
                                onChange={handlePassword2} 
                                value={values.password2} 
                                error={errors.password2Error.status}
                                helperText={errors.password2Error.msg}
                            />
                            
                            <FormControl fullWidth>
                                <InputLabel>Login As</InputLabel>
                                <Select
                                value={usertype}
                                label="Login As"
                                onChange={handleUserType}
                                error={errors.usertypeError.status}
                                >
                                <MenuItem value={"user"}>User</MenuItem>
                                <MenuItem value={"staff"}>Staff</MenuItem>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <Button name="next" variant="contained" onClick={handleScroll}>Next</Button>
                            <p>
                                <small>Have an account? <a href="./login">Log in</a></small>
                            </p>
                        </div>

                        <div id="form2" className={"form-block "+scrolling}>
                            <FormControl sx={{ width: "calc(50% - 2px)" }}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={values.gender}
                                    label="Gender"
                                    onChange={handleGender}
                                    error={errors.genderError.status}
                                >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={0}>Female</MenuItem>
                                <MenuItem value={2}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <TextField
                                label="Date of Birth"
                                type="date"
                                value={values.birthday}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                onChange={handleDOB}
                                error={errors.birthdayError.status}
                            />

                            <TextField label="Bio" 
                                placeholder="Tell us about yourself" 
                                onChange={handleBio} 
                                value={values.bio}
                                multiline
                                rows={5}
                                fullWidth />
                            <Button name="prev" variant="contained" onClick={handleScroll}>Back</Button>
                            <Button type="submit" name="signup" variant="contained">Sign Up</Button>
                        </div>
                    </form>
                </Box>
            </div>
        )
    }
}

export default Signup;