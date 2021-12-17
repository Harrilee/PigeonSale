import React, { useState } from "react";
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import LogoCard from "../components/LogoCard";
import AlertCard from "../components/AlertCard";
import AccountService from "../services/account.service";
import './Register.scss';

function SignStaff() {
    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
        gender: "",
        birthday: "",
        bio: ""
    });
    
    const [scrolling,setScroll]=useState("scroll1");

    let resetErrors = {
        loginError: { status: false, msg: "" },
        usernameError: { status: false, msg: "" },
        emailError: { status: false, msg: "" },
        passwordError: { status: false, msg: "" },
        password2Error: { status: false, msg: "" },
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
        
        AccountService.signup(values, "staff")
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                window.location.href="./login";
            }
            if (result.status === 0) {
                setErrors({...errors, loginError: { status: true, msg: result.msg } });
            }
        })
        .catch(err => {
            return
        });

    }

    if (localStorage.isLoggedIn === "true" && localStorage.usertype !== "admin") {
        window.location.href="./";
    }
    else if (localStorage.isLoggedIn === "true" && localStorage.usertype === "admin") {
        return (
            <div id="register-wrapper" name="signup">
                <Box id="register-container">
                    <AlertCard severity="error" id="register-error" 
                    display={errors.loginError.status} 
                    message={errors.loginError.msg} static={true} />

                    <LogoCard title="Staff Sign Up" position="center" size="medium" />

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
                            <Button name="next" variant="contained" onClick={handleScroll}>Next</Button>
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
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
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

export default SignStaff;