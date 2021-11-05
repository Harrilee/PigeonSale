import React from "react";
import { Alert, Zoom } from "@mui/material";

function AlertCard(props) {

    return (
        <Zoom in={props.display}>
            <Alert severity={props.severity} id={props.id}>{props.message}</Alert>
        </Zoom>
    )
}

export default AlertCard;


