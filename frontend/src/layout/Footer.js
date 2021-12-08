import React from 'react';
import './Footer.scss';
import LogoCard from '../components/LogoCard';

function Footer() {
    return (
       <footer>
          <LogoCard title="" size="small" position="center" />
          <p>Pigeon Sale is a secondhand trading system / e-commerce web application</p>
          <p>Created by Harry Lee, Justin Chen, and Robin Luo</p>
          <p><a href="https://github.com/Harrilee/PigeonSale">Github</a></p>
       </footer>
    )
}

export default Footer;