import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <div className='footer'>
      <div className='content'>
        <h1 className='logo'>Orenoo</h1>
        <Link to='/contact'>Contact Us</Link>
        <Link to='/about'>About</Link>
        <Link to='/terms'>Terms of Service</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
        <p id='copyright'>copyright &#9400; 2019 | Orenoo</p>
      </div>
    </div>
  );
};

export default Footer;
