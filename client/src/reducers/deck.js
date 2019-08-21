import {
  ADD_DECK,
  GET_DECKS,
  GET_DECK,
  CLEAR_DECK,
  REMOVE_DECK
} from '../actions/types';

const initialState = {
  decks: [],
  deck: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DECK:
      return {
        ...state,
        decks: [...state.decks, payload],
        loading: false
      };
    case GET_DECKS:
      return {
        ...state,
        decks: payload,
        loading: false
      };
    case CLEAR_DECK:
      return {
        ...state,
        deck: null
      };
    case GET_DECK:
      return {
        ...state,
        deck: payload,
        loading: false
      };

    case REMOVE_DECK:
      return {
        ...state,
        decks: state.decks.filter(deck => deck._id !== payload)
      };

    default:
      return state;
  }
}
