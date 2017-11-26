import Immutable from "immutable";
import { types as commentTypes } from "./comments";
import { types as postTypes } from "./posts";

const initialState = Immutable.fromJS({});

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case commentTypes.FETCH_COMMENTS:
    case postTypes.FETCH_ALL_POSTS:
      return state.merge(action.users);
    case postTypes.FETCH_POST:
      return state.set(action.user.id, action.user);
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUserById = (state, id) => {
  return state.getIn(["users", id]);
};

export const getUsers = (state) => {
  return state.get("users");
};
