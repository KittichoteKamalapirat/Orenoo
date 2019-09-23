import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Alert from '../layout/Alert';
const EditProfile = ({
  profile: { profile, loading },
  auth,
  history,
  getCurrentProfile,
  createProfile
}) => {
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      google: loading || !profile.google === null ? true : profile.google,
      dict: loading || !profile.dict === null ? true : profile.dict,
      mnemonic: loading || !profile.mnemonic === null ? true : profile.mnemonic,
      synonym: loading || !profile.synonym === null ? true : profile.synonym,
      example: loading || !profile.example === null ? true : profile.example,
      inSentence:
        loading || !profile.inSentence === null ? true : profile.inSentence,
      thai: loading || !profile.thai === null ? true : profile.thai,
      youdao: loading || !profile.youdao === null ? true : profile.youdao,
      hippo: loading || !profile.hippo === null ? true : profile.hippo
    });
  }, [loading, getCurrentProfile]);

  const [formData, setFormData] = useState({
    google: true,
    dict: true,
    mnemonic: true,
    synonym: true,
    example: true,
    inSentence: true,
    thai: true,
    youdao: true,
    hippo: true
  });

  const {
    google,
    dict,
    mnemonic,
    synonym,
    example,
    inSentence,
    thai,
    youdao,
    hippo
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <div className='profile-section'>
      <Alert />
      <h1>My Profile</h1>
      {auth.isAuthenticated && auth.user !== null && (
        <div className='account-info'>
          <p>email</p>
          <p>{auth.user.email}</p>
        </div>
      )}
      <div className='api'>
        <h3>My Study Sources</h3>
        <form className='checkbox-container' onSubmit={e => onSubmit(e)}>
          <div className='checkbox google-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='google'
              id='google'
              //   value={google}
              checked={google}
            />

            <label for='google'>Google API</label>
          </div>

          <div className='checkbox dictionary-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='dict'
              id='dict'
              checked={dict}
            />

            <label for='dict'>Dictionary.com</label>
          </div>

          <div className='checkbox mnemonic-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='mnemonic'
              id='mnemonic'
              value={mnemonic}
              checked={mnemonic}
            />

            <label for='mnemonic'>Mnemonic </label>
          </div>

          <div className='checkbox example-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='example'
              id='example'
              value={example}
              checked={example}
            />

            <label for='example'>SentenceExamples.com</label>
          </div>
          <div className='checkbox inSentence-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='inSentence'
              id='inSentence'
              value={inSentence}
              checked={inSentence}
            />

            <label for='inSentence'>WordInSentence.com</label>
          </div>
          <div className='checkbox thesaurus-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='synonym'
              id='synonym'
              value={synonym}
              checked={synonym}
            />

            <label for='synonym'>Thesaurus.com</label>
          </div>

          <div className='checkbox hippo-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='hippo'
              id='hippo'
              value={hippo}
              checked={hippo}
            />

            <label for='hippo'>wordhippo.com</label>
          </div>
          <div className='checkbox longdo-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='thai'
              id='thai'
              value={thai}
              checked={thai}
            />

            <label for='thai'>Longdo.com (Thai)</label>
          </div>
          <div className='checkbox youdao-color'>
            <input
              onChange={e => onChange(e)}
              //   don't forget to put e !
              type='checkbox'
              name='youdao'
              id='youdao'
              value={youdao}
              checked={youdao}
            />

            <label for='youdao'>youdao.com (Chinese)</label>
          </div>
          <input type='submit' className='btn btn-primary' value='save' />
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
