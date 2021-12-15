import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addDeck, getDecks, getDeck, removeDeck } from "../../actions/deck";
import DeckForm from "./DeckForm";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";

const Decks = ({
  auth,
  deck: { loading, deck, decks },
  addDeck,
  getDecks,
  getDeck,
  removeDeck,
}) => {
  useEffect(() => {
    getDecks();
  }, [getDecks]);

  const [displayForm, toggleDisplayForm] = useState(false);
  return (
    <Fragment>
      <div className="alert-container">
        <Alert />
      </div>
      <div className="decks">
        <h1>My Decks</h1>
        <button
          className="toggle-form-button"
          onClick={(e) => toggleDisplayForm(!displayForm)}
        >
          {displayForm ? "-" : "+"}
        </button>
        {displayForm && <DeckForm />}

        {!auth.loading && !loading ? (
          <ul className="deck-list">
            {/* <li>
              <Link to={'/decks/combined'}>All your vocabularies</Link>
            </li>

            <li>
              <Link to={'/decks/5d80d318ef7be21f17fcb014'}>
                Top 20 Most Common GRE Words by Magoosh
              </Link>
            </li>

            <li>
              <Link to={'/decks/5d80db8b1809c820678383d8'}>
                Top 52 GRE Words by Kaplan
              </Link>
            </li>

            <li>
              <Link to={'/decks/5d80dd898e906a20a2efd118'}>
                Top 101 High Frequency GRE Words by CrunchPrep
              </Link>
            </li>

            <li>
              <Link to={'/decks/5d80dff7af877920d88a8491'}>
                Top 30 TOEFL Words by FluentU
              </Link>
            </li> */}

            {decks.map((deck) => (
              <li>
                <Link to={`/decks/${deck._id}`}>{deck.deck_name}</Link>
                <button
                  className="remove-deck-button"
                  onClick={(e) => removeDeck(deck._id, deck.deck_name)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

Decks.propTypes = {
  auth: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  addDeck: PropTypes.func.isRequired,
  getDecks: PropTypes.func.isRequired,
  getDeck: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  deck: state.deck,
});
export default connect(mapStateToProps, {
  addDeck,
  getDecks,
  getDeck,
  removeDeck,
})(Decks);
