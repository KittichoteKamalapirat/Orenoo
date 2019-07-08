import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWords } from '../actions/word';

const Words = ({ word: { words, loading }, getWords }) => {
  useEffect(() => {
    getWords();
  }, [getWords]);
  return (
    <Fragment>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <Fragment>
          <h1>Words list</h1>
          {words.map(word => (
            <li>{word.word}</li>
          ))}
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
