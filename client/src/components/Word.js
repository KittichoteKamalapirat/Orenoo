import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Word = ({
  word: {
    word: { word }
  }
}) => {
  return <h1>{word}</h1>;
};

Word.propTypes = {
  word: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});
export default connect(mapStateToProps)(Word);
