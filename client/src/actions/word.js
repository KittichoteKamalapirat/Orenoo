import { GET_WORDS, GET_WORD, DELETE_WORD } from './types';
import axios from 'axios';

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
