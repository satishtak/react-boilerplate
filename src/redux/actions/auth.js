export const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  REMOVE_USER: 'REMOVE_USER',
  CHECK_LOGIN_STARTED: 'CHECK_LOGIN_REQ_STARTED',
  CHECK_LOGIN_SUCCESS: 'CHECK_LOGIN_REQ_SUCCESS',
  CHECK_LOGIN_FAILURE: 'CHECK_LOGIN_REQ_FAILURE',
  SET_FORCE_RESET: 'SET_FORCE_RESET',
};

export const logoutUser = () => async (dispatch) => {
};

export const checkLogin = () => async (dispatch) => {
  dispatch({
    type: AUTH_ACTIONS.CHECK_LOGIN_STARTED,
  });
  try {
    const userData = {}; // await checkLoginApi();
    localStorage.setItem(
      'loggedUser',
      JSON.stringify({ ...userData.user }),
    );
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: { ...userData.user },
    });
    dispatch({
      type: AUTH_ACTIONS.CHECK_LOGIN_SUCCESS,
    });
  } catch (err) {
    localStorage.removeItem('loggedUser');
    dispatch({
      type: AUTH_ACTIONS.CHECK_LOGIN_FAILURE,
    });
    dispatch({
      type: AUTH_ACTIONS.REMOVE_USER,
    });
  }
};
