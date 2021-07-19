import { AUTH_ACTIONS } from '../actions/auth';

const initialAppState = {
  // user: null,
  user: {}, // this is when user logged in
  loading: false,
};

const authReducer = (state = initialAppState, action) => {
  if (action.type === AUTH_ACTIONS.SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === AUTH_ACTIONS.REMOVE_USER) {
    return { ...state, user: null };
  }
  if (action.type === AUTH_ACTIONS.CHECK_LOGIN_STARTED) {
    return { ...state, loading: true };
  }
  if (
    action.type === AUTH_ACTIONS.CHECK_LOGIN_SUCCESS ||
    action.type === AUTH_ACTIONS.CHECK_LOGIN_FAILURE
  ) {
    return { ...state, loading: false };
  }
  return state;
};
export default authReducer;
