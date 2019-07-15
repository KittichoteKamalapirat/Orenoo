import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Word = ({
  word: {
    word: { word, _id, dict, thai, mnemonic, synonym, example }
  }
}) => (
  // dictionary.com
  <div>
    <h1>{word}</h1>

    <div className='dict shadow-box'>
      <h2 className='dictionary-color'>Dictionary.com</h2>
      {dict.noun.length > 0 && <h3>noun</h3>}
      <ul>
        {dict.noun &&
          dict.noun.map((sen, index) => (
            <div>
              <li>
                {' '}
                <span>{index}&nbsp; &nbsp;</span>
                {sen}
              </li>
            </div>
          ))}
      </ul>

      {dict.verb.length > 0 && <h3>verb</h3>}
      <ul>
        {dict.verb &&
          dict.verb.map((sen, index) => (
            <div>
              <li>
                {' '}
                <span>{index}&nbsp; &nbsp;</span>
                {sen}
              </li>
            </div>
          ))}
      </ul>

      {dict.adjective.length > 0 && <h3>adjective</h3>}
      <ul>
        {dict.adjective &&
          dict.adjective.map((sen, index) => (
            <div>
              <li>
                {' '}
                <span>{index}&nbsp; &nbsp;</span>
                {sen}
              </li>
            </div>
          ))}
      </ul>

      {dict.adverb.length > 0 && <h3>adverb</h3>}
      <ul>
        {dict.adverb &&
          dict.adverb.map((sen, index) => (
            <div>
              <li>
                {' '}
                <span>{index}&nbsp; &nbsp;</span>
                {sen}
              </li>
            </div>
          ))}
      </ul>

      {dict.idioms.length > 0 && <h3>idioms</h3>}
      <ul>
        {dict.idioms &&
          dict.idioms.map((sen, index) => (
            <div>
              <li>
                {' '}
                <span>{index}&nbsp; &nbsp;</span>
                {sen}
              </li>
            </div>
          ))}
      </ul>
    </div>

    {/* longdo.com */}
    <div className='thai shadow-box'>
      <h2 className='longdo-color'>Longdo.com</h2>
      <ul>
        {thai.map(obj => (
          <li className='row'>
            <b>{obj.word}</b>
            <span>{obj.meaning}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* mnemonic.com */}
    <div className='mnemonic shadow-box'>
      <h2 className='mnemonic-color'>Mnemonic Dictionary</h2>
      {mnemonic.slice(0, 4).map(obj => (
        <div className='item'>
          <hr />
          <br />
          <p>{obj.content}</p>
          <span className='like'>{obj.like}</span>
          <span className='dislike'> {obj.dislike}</span>
        </div>
      ))}
    </div>

    {/* synonym */}
    <div className='synonym shadow-box'>
      <h2 className='thesaurus-color'>Thesauras.com</h2>
      <ul>
        {synonym.map(syn => (
          <li>{syn}</li>
        ))}
      </ul>
    </div>

    {/* Sentence Example */}
    <div className='example shadow-box'>
      <h2 className='example-color'>Sentence Example</h2>

      {example.slice(0, 4).map(sen => (
        <div className='item'>
          <hr />
          <br />
          <p>{sen}</p>
          <br />
        </div>
      ))}
    </div>
  </div>
);

Word.propTypes = {
  word: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  word: state.word
});
export default connect(mapStateToProps)(Word);
