import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';

import authReducer from './auth';

export default combineReducers({
  auth: authReducer,
  modal,
});
