import React, { useEffect, useState } from 'react';
import { Grid, Card  } from "@mui/material";
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import "./ProfileSettings.scss";
import "./AddressBook.scss";

function AddressBook(props) {

    const [addressList, setAddressList] = useState(-1);

    const renderAddresses = () => {
        if (addressList.length > 0) {
            return addressList.map((addr,i) => {
                if (props.variant === "editing") {
                    return <Grid item xs={2} sm={4} md={4} key={i}>
                    <Card className={"address-card"} variant="outlined">
                    <h2>{addr.name}</h2>
                    {addr.address}<br/>
                    {addr.phone}
                    <div>
                    <div onClick={() => props.selection.setSelectAction("editing",i)} name="editaddr"><EditIcon/></div>
                    <div onClick={() => props.selection.setSelectAction("deleting",i)} name="deladdr"><DeleteIcon/></div>
                    </div>
                    </Card>
                    </Grid>
                }
                else if (props.variant === "editing-selecting") {
                    if (i === props.selection.selectedInd) {
                        return <Grid item xs={2} sm={4} md={4} key={i}>
                        <Card className={"address-card selected-address"} variant="outlined" onClick={() => props.selection.setSelectAction(props.variant,i)}>
                        <h2>{addr.name}</h2>
                        {addr.address}<br/>
                        {addr.phone}
                        <div>
                        <div onClick={() => props.selection.setSelectAction("editing",i)} name="editaddr"><EditIcon/></div>
                        <div onClick={() => props.selection.setSelectAction("deleting",i)} name="deladdr"><DeleteIcon/></div>
                        </div>
                        </Card>
                        </Grid>
                    }
                    else {
                        return <Grid item xs={2} sm={4} md={4} key={i}>
                        <Card className={"address-card"} variant="outlined" onClick={() => props.selection.setSelectAction(props.variant,i)}>
                        <h2>{addr.name}</h2>
                        {addr.address}<br/>
                        {addr.phone}
                        <div>
                        <div onClick={() => props.selection.setSelectAction("editing",i)} name="editaddr"><EditIcon/></div>
                        <div onClick={() => props.selection.setSelectAction("deleting",i)} name="deladdr"><DeleteIcon/></div>
                        </div>
                        </Card>
                        </Grid>
                    }
                }
                else {
                    return <Grid item xs={2} sm={4} md={4} key={1}>
                    Hm, something went wrong...
                    </Grid>
                }
            });
        }
        else if (addressList.length === 0) {
            return <Grid item xs={2} sm={4} md={4} key={1}>
                    No addresses
                </Grid>
        }
        else if (addressList === 0) {
            return <Grid item xs={2} sm={4} md={4} key={1}>
                    Hm, something went wrong...
                </Grid>
        }
        return <Grid item xs={2} sm={4} md={4} key={1}>
                Loading...
            </Grid>  
    }

    useEffect(() => {
        if (props.addresses !== addressList && props.loaded) {
            setAddressList(props.addresses);
        }
    }, [props, addressList]);

    return ( 
            <Grid container id="address-grid"
                spacing={{ xs: 1, md: 2 }} 
                columns={{ xs: 4, sm: 8, md: 13 }}
                flow="column wrap"
                justifyContent="left"
                alignItems="justify"
            >
                {renderAddresses()}
            </Grid>
    )
}

export default AddressBook;