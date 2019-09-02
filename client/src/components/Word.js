import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWord, toggleFlag } from '../actions/word';
import { SayButton } from 'react-say';
const Word = ({
  word: {
    word: {
      word,
      _id,
      flagged,
      dict,
      google,
      thai,
      mnemonic,
      synonym,
      example,
      inSentence,
      youdao,
      hippo
    }
  },
  profile: { profile, loading },
  auth,
  addWord,
  toggleFlag
}) => {
  return (
    <div className='word-section'>
      <h1>{word}</h1>

      <div className='control-panel'>
        <button
          className='flag-button'
          onClick={e => {
            toggleFlag(_id);
          }}
        >
          {flagged ? (
            <i class='fas fa-star primary-color' />
          ) : (
            <i class='fas fa-star light-grey' />
          )}
        </button>
        <div className='say-one'>
          <SayButton speak={word}>
            <i className=' fas fa-volume-up' />
            <p className='small'>One</p>
          </SayButton>
        </div>
      </div>

      {/* longdo.com */}
      {!loading && profile.thai && (
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
      )}
      {/* youdao */}
      {!loading && profile.youdao && (
        <div className='youdao shadow-box'>
          <h2 className='youdao-color'>youdao.com</h2>
          <ul>
            {youdao.map(arr => (
              <li>{arr}</li>
            ))}
          </ul>
        </div>
      )}
      {/* google */}
      {/* Noun */}
      {!loading && profile.thai && (
        <div className='google shadow-box'>
          <h2>Google API</h2>

          {/* Noun */}
          {google.noun.length > 0 && <h3>noun</h3>}
          {google.noun.length > 0 &&
            google.noun.map((def, index) => (
              <div className='def'>
                {def.definition && (
                  <p className='definition'>{def.definition}</p>
                )}
                {def.example && (
                  <p className='example'>
                    <span>"</span>
                    {def.example}
                    <span>"</span>
                  </p>
                )}

                {def.synonyms && (
                  <p className='synonyms'>
                    <span>Syn:</span>
                    {def.synonyms.map((word, index) => (
                      <Fragment>
                        <button
                          onClick={e => {
                            addWord({ word });
                          }}
                          key={index}
                        >
                          {word}
                        </button>
                        <span>, </span>
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}

          {/* Verb */}
          {google.verb.length > 0 && <h3>verb</h3>}
          {google.verb.length > 0 &&
            google.verb.map((def, index) => (
              <div className='def'>
                {def.definition && (
                  <p className='definition'>{def.definition}</p>
                )}
                {def.example && (
                  <p className='example'>
                    <span>"</span>
                    {def.example}
                    <span>"</span>
                  </p>
                )}

                {def.synonyms && (
                  <p className='synonyms'>
                    <span>Syn:</span>
                    {def.synonyms.map((word, index) => (
                      <Fragment>
                        <button
                          onClick={e => {
                            addWord({ word });
                          }}
                          key={index}
                        >
                          {word}
                        </button>
                        <span>, </span>
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}

          {/* Adjective */}
          {google.adjective.length > 0 && <h3>adjective</h3>}
          {google.adjective.length > 0 &&
            google.adjective.map((def, index) => (
              <div className='def'>
                {def.definition && (
                  <p className='definition'>{def.definition}</p>
                )}
                {def.example && (
                  <p className='example'>
                    <span>"</span>
                    {def.example}
                    <span>"</span>
                  </p>
                )}

                {def.synonyms && (
                  <p className='synonyms'>
                    <span>Syn:</span>
                    {def.synonyms.map((word, index) => (
                      <Fragment>
                        <button
                          onClick={e => {
                            addWord({ word });
                          }}
                          key={index}
                        >
                          {word}
                        </button>
                        <span>, </span>
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}

          {/* Adverb */}
          {google.adverb.length > 0 && <h3>adverb</h3>}
          {google.adverb.length > 0 &&
            google.adverb.map((def, index) => (
              <div className='def'>
                {def.definition && (
                  <p className='definition'>{def.definition}</p>
                )}
                {def.example && (
                  <p className='example'>
                    <span>"</span>
                    {def.example}
                    <span>"</span>
                  </p>
                )}

                {def.synonyms && (
                  <p className='synonyms'>
                    <span>Syn:</span>
                    {def.synonyms.map((word, index) => (
                      <Fragment>
                        <button
                          onClick={e => {
                            addWord({ word });
                          }}
                          key={index}
                        >
                          {word}
                        </button>
                        <span>, </span>
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
      {/* Word in Sentence */}
      {!loading && profile.example && (
        <div className='example shadow-box'>
          <h2 className='inSentence-color'>Word in Sentence</h2>

          {inSentence.slice(0, 6).map(sen => (
            <div className='item'>
              <hr />
              <br />
              <p>{sen.substring(0, sen.length - 2)}</p>
              <br />
            </div>
          ))}
        </div>
      )}
      {/* mnemonic.com */}
      {!loading && profile.mnemonic && (
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
      )}
      {!loading && profile.dict && (
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
      )}
      {/* Word in Sentence */}
      {!loading && profile.hippo && (
        <div className='example shadow-box'>
          <h2 className='hippo-color'>Word Hippo</h2>

          {hippo.slice(0, 6).map(sen => (
            <div className='item'>
              <hr />
              <br />
              <p>{sen}</p>
              <br />
            </div>
          ))}
        </div>
      )}
      {/* synonym */}
      {!loading && profile.synonym && (
        <div className='synonym shadow-box'>
          <h2 className='thesaurus-color'>Thesauras.com</h2>
          <ul>
            {synonym.map(word => (
              <li>
                {' '}
                {/* importtant to make this to be word since req needs req.body.word*/}
                <button
                  className='synonym-item'
                  onClick={e => {
                    addWord({ word });
                  }}
                >
                  {word}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Sentence Example */}
      {!loading && profile.synonym && (
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
      )}
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addWord: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  word: state.word,
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addWord, toggleFlag }
)(Word);
