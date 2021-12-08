
import React, { useState } from 'react';
import { Button, Dialog, DialogContent } from "@mui/material";
import "./TinyEditor.scss";
import DealService from '../services/deal.service';
import AlertCard from '../components/AlertCard';
import LogoCard from '../components/LogoCard';

function ConfirmReceipt(props) {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" })

    const handleSubmit = () => {
        DealService.confirmReceipt(props.deal_id)
        .then(res => res.json())
        .then(result => {
            if (result.status === 1) {
                setOpenConfirm(true);
            }
            else if (result.status === 0) {
                setAlertCard(({ type: "error", status: true, msg: result.msg }));
            }
        })
        .catch(err => {
            console.log(err);
            setAlertCard(({ type: "error", status: true, msg: "Something went wrong..." }));
        });
    }

    return (
        <React.Fragment>
        <AlertCard severity={alertCard.type} id="editor-alert" 
                 display={alertCard.status} 
                 message={alertCard.msg}
                 static={false} />
        <Button variant="outlined" className="deal-button confirm-button" onClick={handleSubmit}>Confirm Receipt</Button>
        <Dialog id="confirmation-modal"
            open={openConfirm}>
            <DialogContent>
                <LogoCard position="center" />
                <h2 className="title center">Your order ID#{props.deal_id} has been confirmed!</h2>
                <Button variant="contained" onClick={() => window.location.reload()}>OK</Button>
            </DialogContent>
        </Dialog>
        </React.Fragment>
    )

}

export default ConfirmReceipt;