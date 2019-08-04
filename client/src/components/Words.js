import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWords, speak, shutup } from '../actions/word';
import WordItem from './WordItem';
import Word from './Word';
import Spinner from './layout/Spinner';
import Alert from './layout/Alert';

const Words = ({ word: { words, word, loading }, getWords, speak, shutup }) => {
  useEffect(() => {
    getWords();
  }, [getWords]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid'>
          <div className='navbar'>
            <div className='word-item'>
              {words.map(word => (
                <WordItem key={word._id} word={word} />
              ))}
            </div>
          </div>
          <div className='right-area'>
            <Alert />
            {!word ? <h1>select word</h1> : <Word />}
            {/* <audio
              src='https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=parlous%20parlous%20parlous%20'
              autoplay
              controls
            /> */}
            <button
              onClick={e => {
                speak(words);
              }}
            >
              speak
            </button>

            <button
              onClick={e => {
                shutup();
              }}
            >
              stop
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Words.propTypes = {
  getWords: PropTypes.func.isRequired,
  speak: PropTypes.func.isRequired,
  shutup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});

export default connect(
  mapStateToProps,
  { getWords, speak, shutup }
)(Words);
