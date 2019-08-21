import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getWords,
  speak,
  shutup,
  resume,
  cancel,
  sayAll,
  sayFlagged,
  shuffle,
  unshuffle
} from '../actions/word';
import WordItem from './WordItem';
import Word from './Word';
import Spinner from './layout/Spinner';
import Alert from './layout/Alert';
import Say from 'react-say';

const Words = ({
  word: { words, word, loading, sayingAll, sayingFlagged, shuffled },
  getWords,
  speak,
  shutup,
  resume,
  cancel,
  sayAll,
  sayFlagged,
  deck_id,
  shuffle,
  unshuffle
}) => {
  useEffect(() => {
    getWords(deck_id);
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
            <div className='alert-container'>
              <Alert />
            </div>

            {sayingAll ? (
              <div className='say-all'>
                <button
                  className='speakIcon'
                  onClick={e => {
                    sayAll(sayingAll);
                  }}
                >
                  <i className='fas fa-volume-mute' />
                  <p className='small'>All</p>
                </button>

                {words.map(word => (
                  <Fragment>
                    <Say speak={word.word} />
                    <Say speak='hello world' rate={0.6} volume={0} />

                    {word.google.noun.length > 0 && (
                      <Fragment>
                        <Say
                          speak={
                            word.word +
                            ' as noun means ' +
                            word.google.noun[0].definition
                          }
                        />
                        <Say speak='hello world' rate={0.6} volume={0} />
                      </Fragment>
                    )}

                    {word.google.verb.length > 0 && (
                      <Fragment>
                        <Say
                          speak={
                            word.word +
                            ' as verb means ' +
                            word.google.verb[0].definition
                          }
                        />
                        <Say speak='hello world' rate={0.6} volume={0} />
                      </Fragment>
                    )}

                    {word.google.adjective.length > 0 && (
                      <Fragment>
                        <Say
                          speak={
                            word.word +
                            ' as adjective means ' +
                            word.google.adjective[0].definition
                          }
                        />
                        <Say speak='hello world' rate={0.6} volume={0} />
                      </Fragment>
                    )}

                    {word.google.adverb.length > 0 && (
                      <Fragment>
                        <Say
                          speak={
                            word.word +
                            ' as adverb means ' +
                            word.google.adverb[0].definition
                          }
                        />

                        <Say speak='hello world' rate={0.6} volume={0} />
                      </Fragment>
                    )}
                    <Say speak='hello world' rate={0.6} volume={0} />
                    {word.inSentence[0] && (
                      <Say
                        speak={word.inSentence[0].substring(
                          0,
                          word.inSentence[0].indexOf('.')
                        )}
                      />
                    )}
                    <Say speak='hello world' rate={0.6} volume={0} />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className='say-all'>
                <button
                  className='speakIcon'
                  onClick={e => {
                    sayAll(sayingAll);
                  }}
                >
                  <i className='fas fa-volume-up' />
                  <p className='small'>All</p>
                </button>
              </div>
            )}

            {sayingFlagged ? (
              <div className='say-flagged'>
                <button
                  className='speakIcon'
                  onClick={e => {
                    sayFlagged(sayingFlagged);
                  }}
                >
                  <i className='fas fa-volume-mute' />
                  <p className='small'>Flagged</p>
                </button>

                {words
                  .filter(word => word.flagged === true)
                  .map(word => (
                    <Fragment>
                      <Say speak={word.word} />
                      <Say speak='hello world' rate={0.6} volume={0} />

                      {word.google.noun.length > 0 && (
                        <Fragment>
                          <Say
                            speak={
                              word.word +
                              ' as noun means ' +
                              word.google.noun[0].definition
                            }
                          />
                          <Say speak='hello world' rate={0.6} volume={0} />
                        </Fragment>
                      )}

                      {word.google.verb.length > 0 && (
                        <Fragment>
                          <Say
                            speak={
                              word.word +
                              ' as verb means ' +
                              word.google.verb[0].definition
                            }
                          />
                          <Say speak='hello world' rate={0.6} volume={0} />
                        </Fragment>
                      )}

                      {word.google.adjective.length > 0 && (
                        <Fragment>
                          <Say
                            speak={
                              word.word +
                              ' as adjective means ' +
                              word.google.adjective[0].definition
                            }
                          />
                          <Say speak='hello world' rate={0.6} volume={0} />
                        </Fragment>
                      )}

                      {word.google.adverb.length > 0 && (
                        <Fragment>
                          <Say
                            speak={
                              word.word +
                              ' as adverb means ' +
                              word.google.adverb[0].definition
                            }
                          />

                          <Say speak='hello world' rate={0.6} volume={0} />
                        </Fragment>
                      )}
                      <Say speak='hello world' rate={0.6} volume={0} />
                      {word.inSentence[0] && (
                        <Say
                          speak={word.inSentence[0].substring(
                            0,
                            word.inSentence[0].indexOf('.')
                          )}
                        />
                      )}
                      <Say speak='hello world' rate={0.6} volume={0} />
                    </Fragment>
                  ))}
              </div>
            ) : (
              <div className='say-flagged'>
                <button
                  className='speakIcon'
                  onClick={e => {
                    sayFlagged(sayingFlagged);
                  }}
                >
                  <i className='fas fa-volume-up' />
                  <p className='small'>Flagged</p>
                </button>
              </div>
            )}

            <div className='shuffle-icon'>
              {shuffled ? (
                <button
                  onClick={e => {
                    unshuffle(words);
                  }}
                >
                  <i className='fas fa-random primary-color' />
                </button>
              ) : (
                <button
                  onClick={e => {
                    shuffle(words);
                  }}
                >
                  <i className='fas fa-random light-grey' />
                </button>
              )}
            </div>
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
  sayAll: PropTypes.func.isRequired,
  sayFlagged: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
  unshuffle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});

export default connect(
  mapStateToProps,
  {
    getWords,
    speak,
    shutup,
    resume,
    cancel,
    sayAll,
    sayFlagged,
    shuffle,
    unshuffle
  }
)(Words);
