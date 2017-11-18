import { types as commentTypes } from "./comments";
import { types as postTypes } from "./posts";

const initialState = {};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case commentTypes.FETCH_REMARKS:
    case postTypes.FETCH_ALL_TOPICS:
      return { ...state, ...action.users };
    case postTypes.FETCH_TOPIC:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUserById = (state, id) => {
  return state.users[id];
};
