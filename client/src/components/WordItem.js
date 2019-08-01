import React from 'react';
import PropTypes from 'prop-types';
import { getWord, deleteWord } from '../actions/word';
import { connect } from 'react-redux';

const WordItem = ({ word: { word, _id }, getWord, deleteWord }) => {
  // psedo code
  // if(shuffle is true){ unshuffle ( order by time)}
  // else shuffle (use the algorithm)
  // useState = [shuffle, setShuffle]
  // const toggleShuffle = words => {
  //   if (shuffleState === true){

  //   } else {
  //     !shuffle etc
  //   }
  // }

  return (
    <div className='each-item'>
      <button className='word' onClick={e => getWord(_id)}>
        {word}
      </button>
      <button className='remove-word' onClick={e => deleteWord(_id, word)}>
        +
      </button>
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
