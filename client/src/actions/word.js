import {
  ADD_WORD,
  GET_WORDS,
  GET_WORD,
  DELETE_WORD,
  SHUFFLE_WORDS,
  UNSHUFFLE_WORDS,
  SPEAK
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
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
    dispatch(setAlert(`${word.word} added`, 'success'));
  } catch (err) {
    dispatch(setAlert(`unable to add ${word.word}`, 'danger'));
    console.error(err.message);
  }
};

// get all the words
export const getWords = () => async dispatch => {
  try {
    const res = await axios.get('/api/words');
    console.log(res);
    console.log(res.data);
    console.log('hihi');
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

export const speak = words => async dispatch => {
  try {
    const synth = window.speechSynthesis;

    // if (synth.speaking) {
    //   synth.pause();
    // } else {
    //   for (let i = 0; i < words.length; i++) {
    //     const speakText = new SpeechSynthesisUtterance(words[i].word);
    //     setTimeout(function() {
    //       synth.speak(speakText);
    //     }, 2000 * i);
    //   }
    // }

    for (let i = 0; i < words.length; i++) {
      const speakText = new SpeechSynthesisUtterance(words[i].word);
      setTimeout(function() {
        synth.speak(speakText);
      }, 4000 * i);

      setTimeout(function() {
        synth.speak(speakText);
      }, 4000 * i + 2000);
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
    // window.speechSynthesis.cancel();
    window.speechSynthesis.pause();

    dispatch({
      type: SPEAK
    });
  } catch (err) {
    console.error(err.message);
  }
};
