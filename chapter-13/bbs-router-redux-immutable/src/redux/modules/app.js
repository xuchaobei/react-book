import Immutable from "immutable";

const initialState = Immutable.fromJS({
  requestQuantity: 0,
  error: null
});

// action types
export const types = {
  START_REQUEST: "APP/START_REQUEST",
  FINISH_REQUEST: "APP/FINISH_REQUEST",
  SET_ERROR: "APP/SET_ERROR",
  REMOVE_ERROR: "APP/REMOVE_ERROR"
};

// action creators
export const actions = {
  startRequest: () => ({
    type: types.START_REQUEST
  }),
  finishRequest: () => ({
    type: types.FINISH_REQUEST
  }),
  setError: error => ({
    type: types.SET_ERROR,
    error
  }),
  removeError: () => ({
    type: types.REMOVE_ERROR
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REQUEST:
      return state.merge({ requestQuantity: state.get("requestQuantity") + 1 });
    case types.FINISH_REQUEST:
      return state.merge({ requestQuantity: state.get("requestQuantity") - 1 });
    case types.SET_ERROR:
      return state.merge({ error: action.error });
    case types.REMOVE_ERROR:
      return state.merge({ error: null });
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getError = state => {
  return state.getIn(["app", "error"]);
};

export const getRequestQuantity = state => {
  return state.getIn(["app", "requestQuantity"]);
};
