import React, { useEffect } from "react";
import AuthService from "../services/auth.service";
import { Box } from "@mui/material";

function Logout() {

    const handleLogout  = () => {
        AuthService.logout()
        .then(res => {
            console.log(res);
            console.log("Logged out");
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("usertype");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("type");
            localStorage.removeItem("user_id");
            window.location.href = "./";
        })
        .catch(err => {
            console.log(err);
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