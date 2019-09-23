import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Update profile (no create becauase it's created  default)
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? `Profile Updated` : 'Profile Created', 'success'));
    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if (!edit) {
    //   history.push('/dashboard');
    // }
    history.push('/decks');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account $ profile, know the account from the token
// export const deleteAccount = () => async dispatch => {
//   if (window.confirm('Are you sure? This cannot be undone.')) {
//     try {
//       dispatch({ type: CLEAR_PROFILE });
//       dispatch({ type: ACCOUNT_DELETED });

//       dispatch(
//         setAlert('Your account has been permanently deleted', 'success')
//       );
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
//   }
// };
