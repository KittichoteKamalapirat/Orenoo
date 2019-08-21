import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_DECK,
  GET_DECKS,
  GET_DECK,
  REMOVE_DECK,
  CLEAR_DECK
} from './types';

export const addDeck = deck_name => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/decks', deck_name, config);
    console.log(deck_name);
    dispatch({
      type: ADD_DECK,
      payload: res.data
    });
    dispatch(setAlert(`${deck_name.deck_name} is added`, 'success'));
  } catch (err) {
    dispatch(setAlert(`unable to add new deck ${deck_name}`, 'danger'));
    console.error(err.message);
  }
};

// Get all decks
export const getDecks = () => async dispatch => {
  try {
    const res = await axios.get('/api/decks');
    console.log('hihi');
    dispatch({
      type: GET_DECKS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Get a single deck by id to get words
export const getDeck = id => async dispatch => {
  dispatch({
    type: CLEAR_DECK
  });
  try {
    const res = await axios.get(`/api/decks/${id}`);

    dispatch({
      type: GET_DECK,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Remove a deck by id

export const removeDeck = (id, deck) => async dispatch => {
  try {
    if (window.confirm(`Are you sure you want to delete "${deck}"?`)) {
      await axios.delete(`/api/decks/${id}`);
      dispatch({
        type: REMOVE_DECK,
        payload: id
      });
      dispatch(setAlert(`${deck} deleted`, 'success'));
    }
  } catch (err) {
    console.error(err.message);
  }
};
