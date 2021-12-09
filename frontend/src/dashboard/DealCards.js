import React, { useEffect, useState } from 'react';
import "./DealCard.scss";
import { Stack, Box,Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountService from '../services/account.service';
import PostService from '../services/post.service';
import RateEditor from '../deal-editor/RateEditor';
import TrackingNumEditor from '../deal-editor/TrackingNumEditor';
import CancelEditor from '../deal-editor/CancelEditor';
import ConfirmReceipt from '../deal-editor/ConfirmReceipt';
import DealService from '../services/deal.service';

function OrderAccordion(props) {

    const getFormattedDate = (d) => {
        let dlist = d.split(" ")
        let date = dlist[0]
        let time = dlist[1].split(":");
        time = time[0] + ":" + time[1]
        return ( <span className="order-date">{date} at {time}</span> )
    }
    return (
          <Accordion disableGutters className="order-tracking">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ paddingLeft: "1.5em", paddingBottom: "0.4em", borderBottom:"1px solid #d5d5d5" }}
            >
             <h3>Order Tracking</h3>
            </AccordionSummary>
            <AccordionDetails>
            <div className="deal-content">
            <ul>
              {props.tracker.map((item) => {
                    return (
                        <li> {getFormattedDate(item.time)} {item.status} </li>
                    )
                })}
                </ul>
            </div>
            </AccordionDetails>
          </Accordion>
    )
}

function DealCard(props) {

    const [item, setItem] = useState(-1);

    function DealStatus() {
        if (item.status.includes("finished") > 0) {
            return <li className="status-done"><h2>{item.status}</h2></li>;
        }
        else if (item.status.includes("Delivering") > 0) {
            return <li className="status-in-prog"><h2>{item.status}</h2></li>;
        }
        else if (item.status.includes("pending") > 0) {
            return <li className="status-start"><h2>{item.status}</h2></li>;
        }
        else {
            return <li className="status-unknown"><h2>{item.status}</h2></li>
        }
    }

    function DealNotif() {
        if (item.status.includes("pending") > 0 && item.seller_id === parseInt(localStorage.user_id)) {
            return <div className="deal-notif notif-start">
                    Your item is pending. Please add a tracking number. 
                    <TrackingNumEditor name={"Set"} deal_id={item.deal_id} />
                </div>
        }
        return <React.Fragment/>
    }

    function CancelButton() {
        if (item.seller_id === parseInt(localStorage.user_id) 
        && (item.status.includes("finished") <= 0
        && item.status.includes("Cancelled") <= 0)) {
            return <CancelEditor deal_id={item.deal_id} />
        }
        else if (item.buyer_id === parseInt(localStorage.user_id) 
        && (item.status.includes("Unpaid") > 0
        || item.status.includes("pending") > 0)) {
            return <CancelEditor deal_id={item.deal_id} />
        }
        else if (localStorage.usertype === "staff"
        && item.status.includes("Cancelled") > 0) {
            return <CancelEditor deal_id={item.deal_id} />
        }
        return <React.Fragment />
        
    }

    function RateButton() {
        if (item.status.includes("finished") > 0 && item.buyer_id === parseInt(localStorage.user_id)) {
            return  <RateEditor deal_id={item.deal_id} canrate={item.canrate} name={"Rate Seller"} />
        }
        else if (item.status.includes("finished") > 0 && item.seller_id === parseInt(localStorage.user_id)) {
            return  <RateEditor deal_id={item.deal_id} canrate={item.canrate} name={"Rate Buyer"} />
        }
        return <React.Fragment />
    }

    useEffect(()=> {
        if (item === -1) {
            setItem(props.item);
        }
    }, [props, item]);

    if (item === -1) {
        return <React.Fragment />;
    }
    return (
            <Box className="deal-card">
                <ul className="deal-status deal-content">
                    <DealStatus/>
                </ul>
                <div className="deal-card-left">
                    <div className="deal-content">
                    <a href={"/post/"+item.post_id}>
                        <div className="deal-post" style={{ backgroundImage: "url('" + item.post_image + "')", backgroundSize: "100%" }}>
                        <div className="deal-post-content">
                        Go to post
                        </div>
                        </div>
                    </a>
                    </div>
                </div>
                <div className="deal-card-right">
                <div className="deal-content">
                <h3>Seller</h3>
                <div className="deal-user-bar">
                    <a href={"./user/" + item.seller_id}>
                        <div className="post-avatar" style={{ backgroundImage: "url('" + item.seller_avatar + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                                {item.seller_name}
                        </div>
                    </a>
                </div>
                <div className="post-price">
                    ${item.price}
                </div>
                </div>
                <div className="deal-content">
                <h3>Buyer</h3>
                <div className="deal-user-bar">
                    <a href={"./user/" + item.buyer_id}>
                        <div className="post-avatar" style={{ backgroundImage: "url('" + item.buyer_avatar + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                            {item.buyer_name}
                        </div>
                    </a>
                </div>
                <p><span className="deal-label">Address</span> {item.buyer_address}</p>
                <p><span className="deal-label">Phone</span> {item.buyer_phone}</p>
                </div>
                </div>
                <OrderAccordion tracker={item.order_trace} />
                <DealNotif />
                <div className="deal-bar">
                    
                    {item.status.includes("Delivering") > 0 && item.buyer_id === parseInt(localStorage.user_id)
                    ? <ConfirmReceipt deal_id={item.deal_id} /> : <React.Fragment/>}
                     
                     <CancelButton />

                     <RateButton />

                     {item.status.includes("Delivering") > 0 && item.seller_id === parseInt(localStorage.user_id)
                     ? <TrackingNumEditor name={"Reset"} /> : <React.Fragment/>}
                </div>
            </Box>                   
    )
}

function DealCards(props) {

    const [loadedDeals, setLoadedDeals] = useState(false);
    const [items, setItems] = useState(-1);
    let loadedCards = [];

    async function loadDealCards(deals,i) {
        if (i < deals.length) {
            let item = deals[i];
            let extra_values = {};

            PostService.getOnePost(item.post_id)
            .then(res => res.json())
            .then(result => {
                if (result.status === 1 && result.data.post_images.length > 0) {
                    extra_values.post_image = result.data.post_images.length > 0 ? result.data.post_images[0] : "";
                }
                else {
                    extra_values.post_image = "/default/empty-image.png";
                }
                if (parseInt(localStorage.user_id) !== item.seller_id) {
                    return AccountService.getProfile({ user_id : item.seller_id }, "user")
                }
                else {
                    return AccountService.getProfile({ user_id : item.buyer_id }, "user")
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.status === 1) {
                    if (result.data.avatar === "") {
                        result.data.avatar= "/default/empty-icon.png";
                    }
                    extra_values.seller_name = parseInt(localStorage.user_id) !== item.seller_id ? result.data.username : localStorage.username;
                    extra_values.seller_avatar = parseInt(localStorage.user_id) !== item.seller_id ? result.data.avatar : localStorage.avatar;
                    extra_values.buyer_name = parseInt(localStorage.user_id) !== item.buyer_id ? result.data.username : localStorage.username;
                    extra_values.buyer_avatar = parseInt(localStorage.user_id) !== item.buyer_id ? result.data.avatar : localStorage.avatar;
                }
                return DealService.getDealRating(item.deal_id)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 1) {
                    extra_values.canrate = false;
                }
                else {
                    extra_values.canrate = true;
                }
            })
            .then(() => {
                loadedCards.push({ ...item, ...extra_values });
                loadDealCards(deals,i+1);
            })
        }
        else {
            setItems(loadedCards);
            props.setDisabled(false);
            props.setDisabledParent(false);
            return;
        }
    }


    useEffect(() => {
        if (!loadedDeals && props.deals !== -1) {
            props.setDisabled(true);
            props.setDisabledParent(true);
            loadDealCards(props.deals,0);
            setLoadedDeals(true);
        }
    }, [props.deals, loadedDeals, loadDealCards]);

    if (items === -1) {
        return ( 
            <Stack spacing={3}>
                    {"Loading..."}
            </Stack>
        )
    }
    else if (items.length > 0) {
        return ( 
            <Stack spacing={3}>
                {items.map((item,i) => {
                    return  <DealCard variant={props.variant} item={item} key={i}/>
                })}
            </Stack>
        )
    }
    else {
        return ( 
            <Stack spacing={3}>
                    {"No deals have been made"}
            </Stack>
        )
    }
    
    
}

export default DealCards;