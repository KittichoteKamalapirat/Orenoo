import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Fragment>
      <div className='register-form'>
        {/* <div className='close'>+</div> */}
        <h1 className='large bold'>Sign in</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <p>E-mail</p>
            <input
              name='email'
              type='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <p>Password</p>
            <input
              name='password'
              type='password'
              minLength='6'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' value='Sign in' className='btn btn-action' />
        </form>

        <p className='addition'>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
