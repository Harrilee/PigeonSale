import React, { useEffect, useState } from 'react';
import "./DealCard.scss";
import { Stack, Box,Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    useEffect(()=> {
        if (item === -1) {
            setItem(props.item);
        }
    }, [props, item]);

    if (item === -1) {
        return <React.Fragment />
    }
    return (
            <Box className="deal-card">
                <div className="deal-content">
                    <h2>{item.status}</h2>
                </div>
                <div className="deal-card-left">
                    <div className="deal-content">
                    <a href={"/post/"+item.post_id}>
                        <div className="deal-post" style={{ backgroundImage: "url('" + "')", backgroundSize: "100%" }}>
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
                        <div className="post-avatar" style={{ backgroundImage: "url('" + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                                User
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
                        <div className="post-avatar" style={{ backgroundImage: "url('" + "')", backgroundSize: "100%" }}></div>
                        <div className="post-author">
                            User
                        </div>
                    </a>
                </div>
                <p><span className="deal-label">Address</span> {item.buyer_address}</p>
                <p><span className="deal-label">Phone</span> {item.buyer_phone}</p>
                </div>
                </div>
                <OrderAccordion tracker={item.order_trace} />
            </Box>                   
    )
}

function DealCards(props) {

    const [deals, setDeals] = useState(-1);
    const [loadedDeals, setLoadedDeals] = useState(false);


    useEffect(() => {
        if (!loadedDeals && props.deals !== -1) {
            setDeals(props.deals);
            setLoadedDeals(true);
        }
    }, [props.deals, loadedDeals]);

    if (deals === -1) {
        return ( 
            <Stack spacing={3}>
                    {"Loading..."}
            </Stack>
        )
    }
    else if (deals.length > 0) {
        return ( 
            <Stack spacing={3}>
                    {deals.map((item,i) => {
                        return (
                            <DealCard item={item} key={i}/>
                        )
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