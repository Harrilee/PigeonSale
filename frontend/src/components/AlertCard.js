import React, { useEffect, useState } from "react";
import { Alert, Zoom,Snackbar } from "@mui/material";

function AlertCard(props) {

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState("");

    const handleClose = (e, reason) => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.display && props.message !== alert) {
            setOpen(true);
            setAlert(props.message);
        }
    }, [props, alert]);

    if (props.static === false) {
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={props.severity} id={props.id}>{props.message}</Alert>
            </Snackbar>
        )
    }
    else {
        return <Zoom in={props.display}>
            <Alert severity={props.severity} id={props.id}>{props.message}</Alert>
        </Zoom>
    }
}

export default AlertCard;


