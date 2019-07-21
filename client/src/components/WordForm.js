import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addWord } from '../actions/word';
import { connect } from 'react-redux';

const WordForm = ({ addWord }) => {
  const [word, setWord] = useState('');

  return (
    <div class='search-form'>
      <form
        // className='form'
        // onSubmit={e => {
        //   e.preventDefault();
        //   addWord({ word });
        //   setWord('');
        // }}

        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addWord({ word });
            setWord('');
          }
        }}
      >
        <textarea
          name='word'
          rows='1'
          placeholder='Add new vocabulary'
          value={word}
          onChange={e => setWord(e.target.value)}
          required
        />
        {/* <input type='submit' className='btn btn-dark my-1' value='Submit' /> */}
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
