import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWords, speak, shutup, resume, cancel, say } from '../actions/word';
import WordItem from './WordItem';
import Word from './Word';
import Spinner from './layout/Spinner';
import Alert from './layout/Alert';
import Say from 'react-say';

const Words = ({
  word: { words, word, loading, isPlaying },
  getWords,
  speak,
  shutup,
  resume,
  cancel,
  say
}) => {
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
            {isPlaying ? (
              <Fragment>
                <button
                  className='speakIcon'
                  onClick={e => {
                    say(isPlaying);
                  }}
                >
                  <i class='fas fa-volume-mute' />
                </button>

                {words.map(word => (
                  <Fragment>
                    <Say speak={word.word} />
                    <Say speak='hello world' rate={0.6} volume={0} />
                    <Say speak={word.word} />
                    <Say speak='hello world' rate={0.6} volume={0} />
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <button
                  className='speakIcon'
                  onClick={e => {
                    say(isPlaying);
                  }}
                >
                  <i class='fas fa-volume-up' />
                </button>
              </Fragment>
            )}

            <Alert />
            {!word ? <h1>select word</h1> : <Word />}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Words.propTypes = {
  getWords: PropTypes.func.isRequired,
  speak: PropTypes.func.isRequired,
  shutup: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  say: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});

export default connect(
  mapStateToProps,
  { getWords, speak, shutup, resume, cancel, say }
)(Words);
