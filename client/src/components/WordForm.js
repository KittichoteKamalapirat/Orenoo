import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addWord } from '../actions/word';
import { connect } from 'react-redux';

const WordForm = ({ addWord }) => {
  const [word, setWord] = useState('');
  return (
    <div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addWord({ word });
          setWord('');
        }}
      >
        <textarea
          name='title'
          cols='30'
          rows='5'
          placeholder='Add new vocabulary'
          value={word}
          onChange={e => setWord(e.target.value)}
          required
        />
        <h1>{word}</h1>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

WordForm.propTypes = {
  addWord: PropTypes.func.isRequired
};

export default connect(
  null,
  { addWord }
)(WordForm);
