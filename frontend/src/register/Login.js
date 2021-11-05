import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Box, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import LogoCard from "../components/LogoCard";
import AlertCard from "../components/AlertCard";
import AuthService from "../services/auth.service";

import './Register.scss';

function Login(props) {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    
    const [usertype,setUserType]=useState("");
    const [isLoggedIn, setLoggedIn]=useState(false);

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

        console.log("Form submitted");
        if (values.email.length === 0) {
            setErrors({...errors, emailError: { status: true, msg: "Required field"} });
        }
        else if (values.password.length === 0) {
            setErrors({...errors, passwordError: { status: true, msg: "Required field"} });
        }
        else if (usertype.length === 0) {
            setErrors({...errors, usertypeError: { status: true, msg: "Required field"} });
        }
        else {
            AuthService.login(values, usertype)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(result => {
                if (result.status === 1) {
                    setLoggedIn(true);
                    console.log("Login success");
                }
                if (result.status === 0) {
                    // current working example
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
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }
    
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

export default Login;