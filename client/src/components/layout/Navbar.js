import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WordForm from '../WordForm';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { shuffle, unshuffle } from '../../actions/word';

const Navbar = ({
  word,
  auth: { isAuthenticated, loading },
  logout,
  shuffle,
  unshuffle
}) => {
  const authLinks = (
    <div className='auth'>
      <WordForm />
      {word.shuffled ? (
        <button
          onClick={e => {
            unshuffle(word.words);
          }}
        >
          <i className='fas fa-random primary-color' />
        </button>
      ) : (
        <button
          onClick={e => {
            shuffle(word.words);
          }}
        >
          <i className='fas fa-random light-grey' />
        </button>
      )}

      <ul>
        <li>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 id='logo'>Orenoo</h1>
          </Link>

          <a onClick={logout} href='/landing'>
            {'  '}
            <span className='hide-sm'>Log out</span>
          </a>
        </li>

        <li />
      </ul>
    </div>
  );

  const guestLinks = (
    <div className='guest'>
      <Link to='/landing' style={{ textDecoration: 'none' }}>
        <h1 id='logo'>Orenoo</h1>
      </Link>

      <ul>
        <Link to='/register'>
          <li>Sign up</li>
        </Link>
        <Link to='/login'>
          <li>Log in</li>
        </Link>
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
  shuffle: PropTypes.func.isRequired,
  unshuffle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  word: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  word: state.word
});

export default connect(
  mapStateToProps,
  { logout, shuffle, unshuffle }
)(Navbar);
