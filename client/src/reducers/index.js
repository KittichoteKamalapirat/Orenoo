import { combineReducers } from 'redux';
import word from './word';
import user from './user';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  word,
  user,
  alert,
  auth
});
