import React from 'react';
import './Logo.scss';

function LogoCard(props) {

    return (
        <div className={"logo-card " +  props.position + " " + props.size}>
            <div className="logo"><a href="/"><img alt="logo" src='/favicon.png' /></a></div>
            <div className="logo-title"><h2>{props.title}</h2></div>
        </div> 
    )
}

export default LogoCard;