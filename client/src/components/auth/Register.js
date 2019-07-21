import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const { email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='register-form'>
      <h1 className='large bold'>Create account</h1>

      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <p className='lead'>E-mail</p>
          <input
            name='email'
            type='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <p className='lead'>Password</p>
          <input
            name='password'
            type='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <p className='lead'>Confirm password</p>
          <input
            name='password2'
            type='password'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type='submit'
          value='Create account'
          className='btn btn-action'
        />
      </form>

      <p className='addition'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>

      <p className='addition small'>
        By signing up, you agree to the <Link>Terms of Service</Link> and{' '}
        <Link>Privacy Policy</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
