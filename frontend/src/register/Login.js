import React, { useState } from "react";
import { Button, Box, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import LogoCard from "../components/LogoCard";
import AlertCard from "../components/AlertCard";
import AuthService from "../services/auth.service";
import AccountService from "../services/account.service";

import './Register.scss';

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    
    const [usertype,setUserType]=useState("");

    let resetErrors = {
        loginError: { status: false, msg: "" },
        emailError: { status: false, msg: "" },
        passwordError: { status: false, msg: "" },
        usertypeError: { status: false, msg: "" }
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

    const handleUserType = (e) => {
        let usertype = e.target.value;
        setUserType(usertype);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(resetErrors);

        localStorage.setItem("isLoggedIn", false);
        console.log("Form submitted");

        if (values.email.length === 0) {
            setErrors({...errors, emailError: { status: true, msg: "Required field"} });
        }
        else if (values.email.includes("@") === 0) {
            setErrors({...errors, emailError: { status: true, msg: "Not a valid email"} });
        }
        else if (values.password.length === 0) {
            setErrors({...errors, passwordError: { status: true, msg: "Required field"} });
        }
        else if (usertype.length === 0) {
            setErrors({...errors, usertypeError: { status: true, msg: "Required field"} });
        }
        else {
            console.log(values);
            AuthService.login(values, usertype)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(result => {
                if (result.status === 1) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("usertype", usertype);
                    localStorage.setItem("email", values.email);
                    console.log(values);
                    console.log("Login success");
                    return AccountService.getProfile({ email : values.email });
                }
                else if (result.status === 0) {
                    if (result.code === "000" 
                    || result.code === "001"
                    || result.code === "002" ) {
                        setErrors({...errors, loginError: { status: true, msg: result.msg } });
                    } 
                }
                return -1
            })
            .then(res => {
                if (res !== -1) {
                    return res.json();
                }
            })
            .then(result => {
                console.log(result);
                localStorage.setItem("user_id", result.data.user_id);
                localStorage.setItem("username", result.data.username);
                window.location.href="./";
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    if (localStorage.isLoggedIn === "true") {
        console.log("Already logged in");
        window.location.href="./";
        return 
    }
    else {
        return (
            <div id="register-wrapper" name="login">
                <Box id="register-container" >
                    <AlertCard severity="error" id="register-error" 
                    display={errors.loginError.status} 
                    message={errors.loginError.msg} />

                    <LogoCard title="Login" position="center" size="medium" />

                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" 
                            onChange={handleEmail} 
                            value={values.email} 
                            error={errors.emailError.status}
                            helperText={errors.emailError.msg}
                            fullWidth 
                        />
                        <TextField label="Password" 
                            onChange={handlePassword} 
                            type="password"
                            value={values.password} 
                            error={errors.passwordError.status}
                            helperText={errors.passwordError.msg}
                            fullWidth
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

                        <Button type="submit" name="login" variant="contained">Login</Button>
                    </form>

                    <p><small>No account? <a href="./signup">Create one</a></small></p>
                </Box>
            </div>
        )
    }
}

export default Login;