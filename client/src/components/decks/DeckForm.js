import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addDeck } from '../../actions/deck';
import { connect } from 'react-redux';

const DeckForm = ({ addDeck }) => {
  const [deck_name, setDeckName] = useState('');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addDeck({ deck_name });
          setDeckName('');
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addDeck({ deck_name });
            setDeckName('');
          }
        }}
      >
        <textarea
          name='word'
          rows='1'
          placeholder='Add new vocabulary'
          value={deck_name}
          onChange={e => setDeckName(e.target.value)}
          required
        />

        <input type='submit' className='btn btn-primary' value='Add' />
      </form>
    </div>
  );
};

DeckForm.propTypes = {};

export default connect(
  null,
  { addDeck }
)(DeckForm);
