import {
  ADD_WORD,
  GET_WORDS,
  GET_WORD,
  DELETE_WORD,
  SHUFFLE_WORDS,
  UNSHUFFLE_WORDS,
  SPEAK
} from '../actions/types';

const initialState = {
  words: [],
  word: null,
  loading: true,
  shuffled: false,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_WORD:
      return {
        ...state,
        words: [payload, ...state.words],
        loading: false
      };
    case GET_WORDS:
      return {
        ...state,
        words: payload,
        loading: false
      };
    case GET_WORD:
      return {
        ...state,
        word: payload,
        loading: false
      };

    case DELETE_WORD:
      return {
        ...state,
        words: state.words.filter(word => word._id !== payload),
        loading: false
      };
    case SHUFFLE_WORDS:
      return {
        ...state,
        words: payload,
        shuffled: true
      };

    case UNSHUFFLE_WORDS:
      return {
        ...state,
        words: payload,
        shuffled: false
      };

    case SPEAK:
      return {
        ...state
      };

    default:
      return state;
  }
}
