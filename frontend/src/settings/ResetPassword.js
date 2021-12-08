import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import AlertCard from "../components/AlertCard";
import "./ProfileSettings.scss";
import AccountService from "../services/account.service";
import AuthService from "../services/auth.service";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [verification, setVerification] = useState("");

    let resetErrors = {
        passwordError: { status: false, msg: "" },
        password2Error: { status: false, msg: "" },
        verificationError: { status: false, msg: "" }
    }; // to show on form's error message

    const [errors, setErrors] = useState(resetErrors);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const handleVeri = (e) => {
        let veri = e.target.value;
        setVerification(veri);
    }

    const handlePassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }

    const handlePassword2 = (e) => {
        let password2 = e.target.value;
        setPassword2(password2);
    }

    const sendCode = (e) => {
        AuthService.getVerificationCode(localStorage.email)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setAlertCard({ type: "info", status: true, msg: "Verification code sent to " + localStorage.email });
            }
            else if (result.status === 0) {
                setAlertCard({ type: "error", status: true, msg: "Something went wrong..." });
            }
            
        })
        .catch(err => {
            console.log(err);
        });
       
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);
        let values = {};
        setErrors(resetErrors);
        let hasError=false;
        if (password.length === 0) {
            setErrors({...errors, passwordError: { status: true, msg: "Required field"} });
            hasError=true;
        }
        else if (password !== password2) {
            setErrors({...errors, password2Error: { status: true, msg: "Passwords don't match"} });
            hasError=true;
        }
        if (verification.length === 0) {
            setErrors({...errors, verificationError: { status: true, msg: "Required field"} });
            hasError=true;
        }

        if (!hasError) {
            console.log("Values submitted: ", values);
            values = {
                password: password,
                verification_code : verification
            }
            AccountService.updateProfile(values)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(result => {
                if (result.status === 1) {
                    setAlertCard({ type: "success", status: true, msg: "Updated successfully" });
                    setPassword("");
                    setPassword2("");
                    setVerification("");
                }
                if (result.status === 0) {
                    console.log(result);
                    setAlertCard({ type: "error", status: true, msg: result.msg });
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }


    return ( 
        <div id="tab-settings-wrapper" name="resetPassword">
            <AlertCard severity={alertCard.type} id="profile-alert" 
                    display={alertCard.status} 
                    message={alertCard.msg}
                    static={false} />
            <Box id="tab-settings-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                    <TextField sx={{ width: "calc(50% - 0.75em - 2px)" }}
                        label="Password"
                        type="password"
                        onChange={handlePassword} 
                        value={password} 
                        error={errors.passwordError.status}
                        helperText={errors.passwordError.msg}
                        />
                    <TextField sx={{ width: "calc(50% - 0.75em - 2px)" }}
                        label="Confirm Password"
                        type="password"
                        onChange={handlePassword2} 
                        value={password2} 
                        error={errors.password2Error.status}
                        helperText={errors.password2Error.msg}
                        />
                    <TextField 
                        label="Verification Code"
                        onChange={handleVeri} 
                        value={verification} 
                        error={errors.verificationError.status}
                        helperText={errors.verificationError.msg}
                        fullWidth
                    />
                    <Button type="submit" name="reset" variant="contained">Reset Password</Button>
                    <Button name="code" variant="outlined" onClick={sendCode}>Send Code</Button>
            </form>
            </Box>
        </div>
    )
}

export default ResetPassword;