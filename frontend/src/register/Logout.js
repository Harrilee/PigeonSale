import React, { useEffect } from "react";
import AuthService from "../services/auth.service";
import { Box } from "@mui/material";

function Logout() {

    const handleLogout  = () => {
        AuthService.logout()
        .then(res => {
            console.log(res);
            console.log("Logged out");
            AuthService.clearStorage();
            window.location.href="/";
        })
        .catch(err => {
            console.log(err);
            window.location.href = "./";
        });
    }

    useEffect(() => {
        setTimeout(() => {
             handleLogout();
        },1000);
    });

    if (localStorage.isLoggedIn === "false") {
        window.location.href = "./";
        return
    }
    else {
        return (
            <div id="register-wrapper" name="logout">
                <Box id="logout-container">
                    <h2>Logging out... </h2>
                </Box>
            </div>
        )
    }
}

export default Logout;