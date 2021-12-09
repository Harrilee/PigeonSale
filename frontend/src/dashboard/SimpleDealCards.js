import React, { useEffect, useState } from 'react';
import "./DealCard.scss";
import { Stack, Box,Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import RateEditor from '../deal-editor/RateEditor';
import CancelEditor from '../deal-editor/CancelEditor';

function OrderAccordion(props) {

    const getFormattedDate = (d) => {
        let dlist = d.split(" ")
        let date = dlist[0]
        let time = dlist[1].split(":");
        time = time[0] + ":" + time[1]
        return ( <span className="order-date">{date} at {time}</span> )
    }
    return (
          <Accordion disableGutters className="order-tracking" expanded>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ paddingLeft: "1.5em", paddingBottom: "0.4em", borderBottom:"1px solid #d5d5d5" }}
            >
             <h3>Order Tracking &mdash; <a href={"/post/" +props.post_id}>Post ID#{props.post_id} Deal ID#{props.deal_id}</a></h3>
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

function SimpleDealCard(props) {

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

    function CancelButton() {
        if (localStorage.usertype === "staff"
        && item.status.includes("Cancelled") <= 0) {
            return <CancelEditor deal_id={item.deal_id} />
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
                <br/>
                <OrderAccordion tracker={item.order_trace} post_id={item.post_id} deal_id={item.deal_id} />
                <div className="deal-bar">
                     <CancelButton/>
                </div>
            </Box>                   
    )
}

function SimpleDealCards(props) {

    const [loadedDeals, setLoadedDeals] = useState(false);
    const [items, setItems] = useState(-1);

    useEffect(() => {
        if (!loadedDeals && props.deals !== -1) {
            let cancelled = [];
            let running = [];
            for (let i =0; i < props.deals.length;i++) {
                if (props.deals[i].status.includes("Cancelled") > 0) {
                    cancelled.push(props.deals[i]);
                }
                else {
                    running.push(props.deals[i]);
                }
            }
            if (props.variant === "all") {
                setItems(running);
            }
            else {
                setItems(cancelled);
            }
            props.setDisabled(false);
            props.setDisabledParent(false);
            setLoadedDeals(true);
        }
    }, [props.deals, loadedDeals]);

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
                    return  <SimpleDealCard variant={props.variant} item={item} key={i}/>
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

export default SimpleDealCards;