import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getWord, deleteWord } from '../actions/word';
import { connect } from 'react-redux';
import Spinner from './layout/Spinner';

const WordItem = ({
  word: { word, _id, flagged, loading },
  getWord,
  deleteWord
}) => {
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
    <Fragment>
      {' '}
      {loading ? (
        <Spinner />
      ) : (
        <div className='each-item'>
          {flagged ? (
            <button className='flagged' onClick={e => getWord(_id)}>
              {word}
            </button>
          ) : (
            <button className='not-flagged' onClick={e => getWord(_id)}>
              {word}
            </button>
          )}

          <button className='remove-word' onClick={e => deleteWord(_id, word)}>
            +
          </button>
        </div>
      )}
    </Fragment>
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
