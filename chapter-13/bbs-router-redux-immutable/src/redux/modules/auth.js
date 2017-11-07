import Immutable from "immutable";
import { post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = Immutable.fromJS({
  userId: null,
  username: null
});

// action types
export const types = {
  LOGIN: "AUTH/LOGIN",
  LOGOUT: "AUTH/LOGOUT"
};

// action creators
export const actions = {
  login: (username, password) => {
    return dispatch => {
      dispatch(appActions.startRequest());
      const params = { username, password };
      return post(url.login(), params).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(actions.setLoginInfo(data.userId, username));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  logout: () => ({
    type: types.LOGOUT
  }),
  setLoginInfo: (userId, username) => ({
    type: types.LOGIN,
    userId: userId,
    username: username
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return state.merge({ userId: action.userId, username: action.username });
    case types.LOGOUT:
      return state.merge({ userId: null, username: null });
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getLoggedUser = state => {
  return state.get("auth");
};
