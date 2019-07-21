import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './layout/Footer';
const Landing = props => {
  return (
    <div className='landing'>
      <div class='header__bg' />
      <div className='header'>
        <div className='content'>
          <h1>Learn Smarter</h1>
          <p className='lead'>
            Orenoo helps non-native English speakers learn new English
            vocabularies in a more effective way
          </p>
          <Link to='/register'>
            <button className='button'>
              Create Account &nbsp;
              <i className='fas fa-angle-right' />
            </button>
          </Link>
        </div>
      </div>
      <div className='how-it-works'>
        <h2>How it works</h2>
        <p className='lead'>
          Orenoo combines difinition, synonyms, sentence examples, mnemonics
          together.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
