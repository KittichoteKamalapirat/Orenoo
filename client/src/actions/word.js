import {
  ADD_WORD,
  GET_WORDS,
  GET_WORD,
  DELETE_WORD,
  SHUFFLE_WORDS,
  UNSHUFFLE_WORDS,
  SAY_ALL,
  SAY_FLAGGED,
  SAY_ONE,
  SPEAK,
  CLEAR_WORDS,
  CHANGE_ORDER,
  TOGGLE_FLAG
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
// Add a new word
export const addWord = (word, deck_id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    if (deck_id) {
      const res = await axios.post(`/api/words/${deck_id}`, word, config);
      dispatch({
        type: ADD_WORD,
        payload: res.data
      });
      dispatch(setAlert(`${word.word} added`, 'success'));
    } else {
      const res = await axios.post(`/api/words/combined`, word, config);
      dispatch({
        type: ADD_WORD,
        payload: res.data
      });
      dispatch(setAlert(`${word.word} added`, 'success'));
    }
  } catch (err) {
    dispatch(setAlert(`unable to add ${word.word}`, 'danger'));
    console.error(err.message);
  }
};

// get all the words by dieck_id
export const getWords = deck_id => async dispatch => {
  let res;
  try {
    if (
      deck_id === '5d80d318ef7be21f17fcb014' ||
      '5d80db8b1809c820678383d8' ||
      '5d80dd898e906a20a2efd118' ||
      '5d80dff7af877920d88a8491' ||
      '5d80dff7af877920d88a8491'
    ) {
      res = await axios.get(`/api/words/default-deck/${deck_id}`);
    } else {
      res = await axios.get(`/api/words/${deck_id}`);
    }

    dispatch({
      type: GET_WORDS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getAllWords = () => async dispatch => {
  try {
    const res = await axios.get(`/api/words`);
    dispatch({
      type: GET_WORDS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// get a single word
export const getWord = _id => async dispatch => {
  try {
    dispatch({
      type: GET_WORD,
      payload: _id
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Delete a word
export const deleteWord = (id, word) => async dispatch => {
  try {
    await axios.delete(`/api/words/${id}`);
    dispatch({
      type: DELETE_WORD,
      payload: id
    });
    dispatch(setAlert(`${word} deleted`, 'success'));
  } catch (err) {
    console.error(err.message);
  }
};

export const shuffle = words => dispatch => {
  try {
    // randomize the order Fisher-Yates Shuffle
    const shuffleWords = array => {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
    let shuffled = shuffleWords(words);
    dispatch({
      type: SHUFFLE_WORDS,
      payload: shuffled
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const unshuffle = words => dispatch => {
  try {
    words.sort((a, b) => new Date(b.date) - new Date(a.date));
    dispatch({
      type: UNSHUFFLE_WORDS,
      payload: words
    });
  } catch (err) {
    console.error(err.message);
  }
};

const synth = window.speechSynthesis;

export const speak = words => async dispatch => {
  try {
    for (let i = 0; i < words.length; i++) {
      setTimeout(function() {
        const hello1 = new SpeechSynthesisUtterance('hello1');
        const hello2 = new SpeechSynthesisUtterance('hello2');

        synth.speak(hello1);
        synth.speak(new SpeechSynthesisUtterance(words[i].word));
        synth.speak(hello2);
      }, 4000 * i);

      // setTimeout(function() {
      //   window.speechSynthesis.speak(speakText);
      // }, 4000 * i + 2000);
    }

    dispatch({
      type: SPEAK
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const shutup = () => async dispatch => {
  try {
    synth.pause();

    dispatch({
      type: SPEAK
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const resume = () => async dispatch => {
  try {
    synth.resume();

    dispatch({
      type: SPEAK
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const cancel = () => async dispatch => {
  try {
    synth.cancel();

    dispatch({
      type: SPEAK
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const sayAll = sayingAll => async dispatch => {
  try {
    const val = !sayingAll;
    dispatch({
      type: SAY_ALL,
      payload: val
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const sayFlagged = sayingFlagged => async dispatch => {
  try {
    const val = !sayingFlagged;
    dispatch({
      type: SAY_FLAGGED,
      payload: val
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const sayOne = word => async dispatch => {
  try {
    dispatch({
      type: SAY_ONE,
      payload: word
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const toggleFlag = id => async dispatch => {
  try {
    const res = await axios.put(`/api/words/toggleflag/${id}`);
    dispatch({
      type: TOGGLE_FLAG,
      payload: { id, flagged: res.data }
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const aToZ = words => async dispatch => {
  try {
    let afterSorted = words.sort((a, b) => {
      if (a.word.toLowerCase() < b.word.toLowerCase()) {
        return -1;
      }
      if (a.word.toLowerCase() > b.word.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: CHANGE_ORDER,
      payload: afterSorted
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const zToA = words => async dispatch => {
  try {
    let afterSorted = words.sort((a, b) => {
      if (a.word.toLowerCase() < b.word.toLowerCase()) {
        return 1;
      }
      if (a.word.toLowerCase() > b.word.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    dispatch({
      type: CHANGE_ORDER,
      payload: afterSorted
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const defaultOrder = words => async dispatch => {
  try {
    let afterSorted = words.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
    dispatch({
      type: CHANGE_ORDER,
      payload: afterSorted
    });
  } catch (err) {
    console.error(err.message);
  }
};
