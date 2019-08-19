import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ word, auth: { isAuthenticated, loading }, logout }) => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  const authLinks = (
    <div className='nav'>
      <div className='fix-content'>
        <Link to='/landing' style={{ textDecoration: 'none' }}>
          <h1 id='logo' onClick={e => setIsActive(false)}>
            Orenoo
          </h1>
        </Link>
        <button
          onClick={e => toggle()}
          className={
            isActive
              ? 'hamburger hamburger--collapse is-active'
              : 'hamburger hamburger--collapse'
          }
          type='button'
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner' />
          </span>
        </button>
      </div>

      <ul className={isActive ? 'block' : 'hide'}>
        <li>
          <Link onClick={e => setIsActive(false)} to='/decks'>
            Back To Decks
          </Link>
        </li>

        <li>
          <button onClick={logout} href='/landing'>
            <span className='hide-sm'>Log out</span>
          </button>
        </li>

        <li>
          <Link onClick={e => setIsActive(false)} to='/contact'>
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div className='nav'>
      <div className='fix-content'>
        <Link to='/landing' style={{ textDecoration: 'none' }}>
          <h1 id='logo' onClick={e => setIsActive(false)}>
            Orenoo
          </h1>
        </Link>
        <button
          onClick={e => toggle()}
          className={
            isActive
              ? 'hamburger hamburger--collapse is-active'
              : 'hamburger hamburger--collapse'
          }
          type='button'
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner' />
          </span>
        </button>
      </div>
      <ul className={isActive ? 'block' : 'hide'}>
        <li>
          <Link onClick={e => setIsActive(false)} to='/register'>
            Sign up
          </Link>
        </li>

        <li>
          <Link onClick={e => setIsActive(false)} to='/login'>
            Log in
          </Link>
        </li>

        <li>
          <Link onClick={e => setIsActive(false)} to='/contact'>
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className='horizontal-navbar'>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  word: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  word: state.word
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
