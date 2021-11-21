import React from 'react';
import './Logo.scss';

function LogoCard(props) {

    return (
        <a className="logo-link" href="/">
        <div className={"logo-card " +  props.position + " " + props.size}>
            <div className="logo"><img alt="logo" src='/favicon.png' /></div>
            <div className="logo-title"><h2>{props.title}</h2></div>
        </div> 
        </a>
    )
}

export default LogoCard;