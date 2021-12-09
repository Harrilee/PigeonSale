import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, TextField, Divider } from "@mui/material";
import AlertCard from "../components/AlertCard";
import "./ProfileSettings.scss";
import AccountService from "../services/account.service";
import "./AddressBook.scss";
import AddressBook from "./AddressBook";
import DeleteAddress from './DeleteAddress';

function AddressEditor(props) {

    const [myName, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");


    const [addresses, setAddresses] = useState(-1);
    const [selectedInd, setSelectedInd] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [submitType, setSubmitType] = useState("add");
    const [openDeletion, setOpenDeletion] = useState(false);

    const [alertCard, setAlertCard] = useState({ type: "info", status: false, msg: "" });

    const handleName = (e) => {
        let name = e.target.value;
        setName(name);
    }

    const handleAddress = (e) => {
        let address = e.target.value;
        setAddress(address);
    }

    const handlePhone = (e) => {
        let phone = e.target.value;
        setPhone(phone);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let values = {
            name : myName,
            phone : phone,
            address : address
        };

        if (myName.length === 0 
            || address.length === 0 || phone.length === 0) {
                setAlertCard({ type: "error", status: true, msg: "Input required" });
        }
        else {
            if (submitType === "add") {
                AccountService.addAddress(values)
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if (result.status === 1) {
                        setAlertCard({ type: "success", status: true, msg: "Added successfully" });
                        resetAddressEditor();
                    }
                    if (result.status === 0) {
                        setAlertCard({ type: "error", status: true, msg: result.msg });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else if (submitType === "edit") {
                values = {...values, address_id : addresses[selectedInd].address_id }
                AccountService.updateAddress(values)
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if (result.status === 1) {
                        setAlertCard({ type: "success", status: true, msg: "Updated successfully" });
                        resetAddressEditor();
                    }
                    if (result.status === 0) {
                        setAlertCard({ type: "error", status: true, msg: result.msg });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }

    }

    const resetAddressEditor = () => {
        setAddresses(-1);
        setLoaded(false);
        setSubmitType("add") 
        setName("");
        setAddress("");
        setPhone("");
    }

    const listAddresses = useCallback(() => {
        setTimeout(() => {
            AccountService.getAddresses()
            .then(res => {
                return res.json();
            })
            .then(result => {
                if (result.status === 1) {
                    setAddresses(result.data);
                }
                else {
                    setAddresses(0);
                }
            })
            .catch(err => {
                console.log(err);
                setAddresses(0);
            });
        },500);
        setTimeout(()=> {
            setLoaded(true);
            setAlertCard({ ...alertCard, status: false });
        },1200);
    }, [alertCard, setAlertCard]);

    const setSelectAction = (variant, i) => {
        if (variant === "editing-selecting") {
            setSelectedInd(i);
            props.getSelectedAddress( { buyer_address : addresses[i].address, buyer_phone: addresses[i].phone, buyer_name: addresses[i].name })
        }
        else if (variant === "editing") {
            setSelectedInd(i);
            setName(addresses[i].name);
            setAddress(addresses[i].address);
            setPhone(addresses[i].phone);
            setSubmitType("edit");
        }
        else if (variant === "deleting") {
            setSelectedInd(i);
            setOpenDeletion(true);
        }
    }
    
    const deleteAddress = () => {
        AccountService.deleteAddress(addresses[selectedInd].address_id)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setAlertCard({ type: "success", status: true, msg: "Deleted successfully" });
                resetAddressEditor();
            }
            else {
                setAlertCard({ type: "error", status: true, msg: result.msg });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    const EditorButtons = () => {
        if (submitType === "add") {
            return <div id="address-editor-buttons"><Button type="submit" variant="contained">Add Address</Button>
                </div>
        }
        if (submitType === "edit") {
            return (<div id="address-editor-buttons">
            <Button type="submit" variant="outlined">Update Address</Button>
            <Button onClick={() => { 
                setSubmitType("add");
                setName("");
                setAddress("");
                setPhone("");
                } } variant="contained">Add Address</Button>
            </div>
            )
        }
    }

    useEffect(() => {
        if (!loaded && addresses === -1) {
            listAddresses();
        }
        
    },[addresses, loaded, listAddresses]);
    

    return ( 
        <div id="tab-settings-wrapper" name="addressBook">
        <DeleteAddress deleteAddress={deleteAddress}
        openModal={{ openDeletion: openDeletion, setOpenDeletion : setOpenDeletion } } />
        <AlertCard severity={alertCard.type} id="profile-alert" 
                display={alertCard.status} 
                message={alertCard.msg}
                static={false} />
            <Box id="tab-settings-container">
            <h1>Address Book</h1>
            <AddressBook addresses={addresses} loaded={loaded} 
            selection={{selectedInd:selectedInd, setSelectAction:setSelectAction}} 
            variant={props.variant} />
            <Divider/>
            <form onSubmit={handleSubmit}>
                    <TextField fullWidth
                        label="Name"
                        onChange={handleName} 
                        value={myName} 
                        />
                    <TextField fullWidth
                        label="Address"
                        onChange={handleAddress} 
                        value={address} 
                        />
                    <TextField 
                        label="Phone Number"
                        onChange={handlePhone} 
                        value={phone} 
                    />
                    {EditorButtons()}
            </form>
            </Box>
        </div>
    )
}

export default AddressEditor;