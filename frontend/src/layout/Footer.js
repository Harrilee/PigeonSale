import React from 'react';
import './Footer.scss';
import LogoCard from '../components/LogoCard';

function Footer() {
    return (
       <footer>
          <LogoCard title="Pigeon Sale" size="small" position="left" />
          <p>Pigeon Sale is a secondhand trading system created by Harry Lee, Justin Chen, and Robin Luo.</p>
          <a href="https://github.com/Harrilee/PigeonSale">git</a>
       </footer>
    )
}

export default Footer;