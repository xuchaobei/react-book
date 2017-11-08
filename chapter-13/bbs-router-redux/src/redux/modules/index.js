import { combineReducers } from "redux";
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
  const topicIds = getTopicIds(state);
  return topicIds.map(id => {
    const topic = getTopicById(state, id);
    return { ...topic, author: getUserById(state, topic.author) };
  });
};


export const getTopicDetail = (state, id) => {
  const topic = getTopicById(state, id);
  return topic ? { ...topic, author: getUserById(state, topic.author) } : null;
};

export const getRemarksWithAuthors = (state, topicId) => {
  const remarkIds = getRemarkIdsByTopic(state, topicId);
  if (remarkIds) {
    return remarkIds.map(id => {
      const remark = getRemarkById(state, id);
      return { ...remark, author: getUserById(state, remark.author) };
    });
  } else {
    return [];
  }
};