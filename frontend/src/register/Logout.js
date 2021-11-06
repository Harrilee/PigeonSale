import React, { useEffect } from "react";
import AuthService from "../services/auth.service";
import { Box } from "@mui/material";

function Logout() {

    const handleLogout  = () => {
        const usertype = localStorage.getItem("type");
        AuthService.logout(usertype)
        .then(res => {
            console.log(res);
            console.log("Logged out");
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("type");
            window.location.href = "./";
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            handleLogout();
        }, 1500);
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
                    <p>
                        <small>If you're not immediately redirected, <a href="/">click here</a></small>
                    </p>
                </Box>
            </div>
        )
    }
}

export default Logout;