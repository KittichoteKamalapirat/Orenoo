import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './layout/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useMediaPredicate } from 'react-media-hook';

const Landing = ({ isAuthenticated }) => {
  const biggerThan700 = useMediaPredicate('(min-width: 700px)');

  if (isAuthenticated) {
    return <Redirect to='/decks' />;
  }
  return (
    <div className='landing'>
      <div className='header__bg' />
      <div className='header'>
        {biggerThan700 ? (
          <div className='pc-container'>
            <div className='left'>
              <div className='content'>
                <h1>Learn Smarter</h1>
                <p className='lead'>
                  Orenoo helps non-native English students learn new
                  vocabularies in a more effective way.
                </p>

                <Link to='/register'>
                  <button className='button'>
                    Create Account &nbsp;
                    <i className='fas fa-angle-right' />
                  </button>
                </Link>
              </div>
            </div>
            <div className='right'>
              <div className='phonevid'>
                <img className='iphone' src='/iphone.png' alt='iphone mockup' />
                <video autoPlay muted loop id='video' className='video'>
                  <source src='/orenoo-vid.mov' type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        ) : (
          <div className='phone-container'>
            <h1>Learn Smarter</h1>
            <p className='lead'>
              Orenoo helps non-native English students learn new vocabularies in
              a more effective way.
            </p>
            <Link to='/register'>
              <button className='button'>
                Create Account &nbsp;
                <i className='fas fa-angle-right' />
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className='what'>
        <h2>What is Orenoo</h2>
        <p className='lead'>
          Orenoo combines English vocabulary's Difinition, Synonyms, Sentence
          examples, and Mnemonics together in one application.
        </p>

        <p className='lead'>
          Get started by create your own account and make your own set of
          vocabularies.
        </p>

        <Link to='/register'>
          <span>Create Account &nbsp;</span>
          <i className='fas fa-angle-right' />
        </Link>
      </div>

      <div className='how-it-works'>
        <h2>How it works</h2>
        <p className='lead'>
          Add your own words by typing in the search bar. These terms will be
          saved to your account and you can access them anytime.
        </p>

        <p className='lead'>
          You can delete words that you already remembered and add new one
          whenever you want.
        </p>
      </div>

      <div className='why'>
        <h2>What problem do we solve</h2>
        <p className='lead'>
          Language learners always have difficult remembering new vocabs.
          Therefore, they look in as many sources as possible so they can
          remember. However, most dictionary applications do not offer all the
          resource learners want. With Orenoo, you do not have to go search for
          multiple websites, we combine them for you in one single application.
        </p>
      </div>

      <Footer />
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  null
)(Landing);
