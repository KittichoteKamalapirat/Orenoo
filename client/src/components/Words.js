import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWords } from '../actions/word';
import WordForm from './WordForm';
import WordItem from './WordItem';
import Word from './Word';
import Spinner from './layout/Spinner';

const Words = ({ word: { words, word, loading }, getWords }) => {
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
            {!word ? <h1>select word</h1> : <Word />}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Words.propTypes = {
  users: PropTypes.object.isRequired,
  getWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});

export default connect(
  mapStateToProps,
  { getWords }
)(Words);
