import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Words from '../Words';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import { addDeck, getDecks, getDeck, removeDeck } from '../../actions/deck';
import { connect } from 'react-redux';
import WordForm from '../WordForm';

const Deck = ({ match, word, deck: { loading, deck }, auth, getDeck }) => {
  useEffect(() => {
    getDeck(match.params.id);
  }, [getDeck]);

  return (
    <Fragment>
      {!loading && deck && <WordForm deck_id={deck._id} />}

      {!loading && deck && <Words deck_id={deck._id} />}
    </Fragment>
  );
};

Deck.propTypes = {
  getDeck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  deck: state.deck,
  word: state.word
});
export default connect(
  mapStateToProps,
  { getDeck }
)(Deck);
