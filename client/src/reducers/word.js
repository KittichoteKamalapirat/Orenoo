import {
  ADD_WORD,
  GET_WORDS,
  GET_WORD,
  DELETE_WORD,
  SHUFFLE_WORDS,
  UNSHUFFLE_WORDS,
  SPEAK,
  SAY_ALL,
  SAY_FLAGGED,
  CLEAR_WORDS,
  TOGGLE_FLAG,
  CHANGE_ORDER
} from '../actions/types';

const initialState = {
  words: [],
  word: null,
  loading: true,
  shuffled: false,
  error: {},
  sayingAll: false,
  sayingFlagged: false
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
        word: state.words.filter(word => word._id === payload)[0],
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
    case SAY_ALL:
      return {
        ...state,
        sayingAll: payload
      };

    case SAY_FLAGGED:
      return {
        ...state,
        sayingFlagged: payload
      };

    case TOGGLE_FLAG:
      return {
        ...state,
        word: { ...state.word, flagged: payload.flagged },
        words: state.words.map(word =>
          word._id === payload.id ? { ...word, flagged: payload.flagged } : word
        ),
        loading: false
      };
    case CHANGE_ORDER:
      return {
        ...state,
        words: payload
      };
    case CLEAR_WORDS:
      return {
        ...state,
        words: []
      };

    default:
      return state;
  }
}
