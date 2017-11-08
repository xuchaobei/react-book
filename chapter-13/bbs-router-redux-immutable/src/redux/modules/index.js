import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import remarks, { getRemarkIdsByTopic, getRemarkById } from "./remarks";
import topics, { getTopicIds, getTopicById } from "./topics";
import users, { getUserById } from "./users";

const rootReducer = combineReducers({
  app,
  auth,
  ui,
  topics,
  remarks,
  users
});

export default rootReducer;

// complex selectors
export const getTopicListWithAuthors = state => {
  const allIds = getTopicIds(state);
  return allIds.map(id => {
    const topic = getTopicById(state, id);
    return topic.merge({ author: getUserById(state, topic.get("author")) });
  });
};

export const getTopicDetail = (state, id) => {
  const topic = getTopicById(state, id);
  return topic
    ? topic.merge({ author: getUserById(state, topic.get("author")) })
    : null;
};

export const getRemarksWithAuthors = (state, topicId) => {
  const remarkIds = getRemarkIdsByTopic(state, topicId);
  if (remarkIds) {
    return remarkIds.map(id => {
      const remark = getRemarkById(state, id);
      return remark.merge({ author: getUserById(state, remark.get("author")) });
    });
  } else {
    return Immutable.List();
  }
};
