import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWords } from '../actions/word';
import WordForm from './WordForm';
import WordItem from './WordItem';
import Word from './Word';

const Words = ({ word: { words, word, loading }, getWords }) => {
  useEffect(() => {
    getWords();
  }, [getWords]);
  return (
    <Fragment>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <Fragment>
          <WordForm />
          <h1>Words list</h1>
          {words.map(word => (
            <WordItem key={word._id} word={word} />
          ))}
          {!word ? <h1>select word</h1> : <Word />}
        </Fragment>
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
