import React from 'react';
import { RadioGroup, Radio, FormControlLabel  } from "@mui/material";
import "../settings/AddressBook.scss";

function PaymentMethod() {

    const options= ["Paypal", "Wechat", "Alipay", "Venmo"];

    return ( 
        <RadioGroup
            aria-label="payment-options"
            defaultValue={options[0]}
            name="radio-buttons-group"
        >
            {options.map((item) => {
            return <h2><FormControlLabel value={item} control={<Radio />} label={item} /></h2>
            })}
        </RadioGroup>
    )
}

export default PaymentMethod;