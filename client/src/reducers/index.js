import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

export default combineReducers({
  message: messageReducer,
  user: userReducer
});
