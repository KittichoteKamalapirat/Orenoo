import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import CombinedWords from '../CombinedWords';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import { getAllWords } from '../../actions/word';
import { connect } from 'react-redux';
import WordForm from '../WordForm';

const CombinedDeck = ({ word: { loading }, auth, getAllWords }) => {
  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

  return (
    <Fragment>
      {loading ? <Spinner /> : <WordForm />}

      {loading ? <Spinner /> : <CombinedWords />}
    </Fragment>
  );
};

CombinedDeck.propTypes = {
  getAllWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  deck: state.deck,
  word: state.word
});
export default connect(
  mapStateToProps,
  { getAllWords }
)(CombinedDeck);
