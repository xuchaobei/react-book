import { combineReducers } from "redux-immutable";
import { createSelector } from "reselect";
import Immutable from "immutable";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import remarks, { getRemarkIdsByTopic, getRemarks } from "./remarks";
import topics, { getTopicIds, getTopicList, getTopicById } from "./topics";
import users, { getUsers } from "./users";

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
export const getTopicListWithAuthors = createSelector(
  [getTopicIds, getTopicList, getUsers],
  (allIds, topics, users) => {
    return allIds.map(id => {
      let topic = topics.get(id);
      return topic.merge({ author: users.get(topic.get("author")) });
    });
  }
);

export const getTopicDetail = createSelector(
  [getTopicById, getUsers],
  (topic, users) => {
    return topic
      ? topic.merge({ author: users.get(topic.get("author")) })
      : null;
  }
);

export const getRemarksWithAuthors = createSelector(
  [getRemarkIdsByTopic, getRemarks, getUsers],
  (remarkIds, remarks, users) => {
    if (remarkIds) {
      return remarkIds.map(id => {
        let remark = remarks.get(id);
        return remark.merge({
          author: users.get(remark.get("author"))
        });
      });
    } else {
      return Immutable.List();
    }
  }
);
