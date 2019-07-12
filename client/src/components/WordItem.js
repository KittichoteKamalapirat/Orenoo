import React from 'react';
import PropTypes from 'prop-types';
import { getWord, deleteWord } from '../actions/word';
import { connect } from 'react-redux';

const WordItem = ({ word: { word, _id }, getWord, deleteWord }) => {
  return (
    <div>
      <button onClick={e => getWord(_id)}>{word}</button>
      <button onClick={e => deleteWord(_id)}>X</button>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
  getWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired
};

export default connect(
  null,
  { getWord, deleteWord }
)(WordItem);
