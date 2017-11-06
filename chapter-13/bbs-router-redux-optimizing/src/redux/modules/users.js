import Immutable from "immutable";
import { types as remarkTypes } from "./remarks";
import { types as topicTypes } from "./topics";

const initialState = Immutable.fromJS({});

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case remarkTypes.FETCH_REMARKS:
    case topicTypes.FETCH_ALL_TOPICS:
      return state.merge(action.users);
    case topicTypes.FETCH_TOPIC:
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
