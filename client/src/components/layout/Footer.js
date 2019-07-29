import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <div className='footer'>
      <div className='content'>
        <h1 className='logo'>Orenoo</h1>
        <div className='link'>
          <Link className='link-item' to='/contact'>
            Contact Us
          </Link>
          {/* <Link className='link-item' to='/about'>
            About
          </Link> */}
          <Link className='link-item' to='/terms'>
            Terms of Service
          </Link>
          <Link className='link-item' to='/privacy-policy'>
            Privacy Policy
          </Link>
        </div>
        <p id='copyright'>copyright &#9400; 2019 | Orenoo</p>
      </div>
    </div>
  );
};

export default Footer;
