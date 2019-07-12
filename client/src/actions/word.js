import { ADD_WORD, GET_WORDS, GET_WORD, DELETE_WORD } from './types';
import axios from 'axios';

// Add a new word
export const addWord = word => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/words', word, config);
    dispatch({
      type: ADD_WORD,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// get all the words
export const getWords = () => async dispatch => {
  try {
    const res = await axios.get('/api/words');
    console.log(res);
    console.log(res.data);
    dispatch({
      type: GET_WORDS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// get all the words
export const getWord = id => async dispatch => {
  try {
    const res = await axios.get(`/api/words/${id}`);
    console.log(res);
    console.log(res.data);
    dispatch({
      type: GET_WORD,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// get all the words
export const deleteWord = id => async dispatch => {
  try {
    await axios.delete(`/api/words/${id}`);
    dispatch({
      type: DELETE_WORD,
      payload: id
    });
  } catch (err) {
    console.error(err.message);
  }
};
