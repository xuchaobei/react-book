import Immutable from "immutable";
import { combineReducers } from "redux-immutable";
import { get, put, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";
import { getUserById } from "./users";

// action types
export const types = {
  CREATE_TOPIC: "TOPICS/CREATE_TOPIC",
  UPDATE_TOPIC: "TOPICS/UPDATE_TOPIC",
  FETCH_ALL_TOPICS: "TOPICS/FETCH_ALL_TOPICS",
  FETCH_TOPIC: "TOPICS/FETCH_TOPIC"
};

// action creators
export const actions = {
  fetchAllTopics: () => {
    return (dispatch, getState) => {
      if (shouldFetchAllTopics(getState())) {
        dispatch(appActions.startRequest());
        return get(url.getTopicList()).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { topics, topicsIds, authors } = convertTopicsToPlain(data);
            dispatch(fetchAllTopicsSuccess(topics, topicsIds, authors));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  fetchTopic: id => {
    return (dispatch, getState) => {
      if (shouldFetchTopic(id, getState())) {
        dispatch(appActions.startRequest());
        return get(url.getTopicById(id)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error && data.length === 1) {
            const { topic, author } = convertSingleTopicToPlain(data[0]);
            dispatch(fetchTopicSuccess(topic, author));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  createTopic: (title, content) => {
    return (dispatch, getState) => {
      const state = getState();
      const author = state.getIn(["auth", "userId"]);
      const topic = {
        author,
        title,
        content,
        vote: 0
      };
      dispatch(appActions.startRequest());
      return post(url.createTopic(), topic).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(createTopicSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  updateTopic: (id, topic) => {
    return dispatch => {
      dispatch(appActions.startRequest());
      return put(url.updateTopic(id), topic).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(updateTopicSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  }
};

const fetchAllTopicsSuccess = (topics, topicIds, authors) => ({
  type: types.FETCH_ALL_TOPICS,
  topics,
  topicIds,
  users: authors
});

const fetchTopicSuccess = (topic, author) => ({
  type: types.FETCH_TOPIC,
  topic,
  user: author
});

const createTopicSuccess = topic => ({
  type: types.CREATE_TOPIC,
  topic: topic
});

const updateTopicSuccess = topic => ({
  type: types.UPDATE_TOPIC,
  topic: topic
});

const shouldFetchAllTopics = state => {
  const allIds = state.getIn(["topics", "allIds"]);
  return !allIds || allIds.size === 0;
};

const shouldFetchTopic = (id, state) => {
  /** 
   * state中如果已经存在该topic对象，且有content字段，
   * 则表明state中已经有该topic的完整信息，无需再次发送请求 
  **/
  const topic = state.getIn(["topics", "byId", id]);
  return !topic || !topic.get("content");
};

const convertTopicsToPlain = topics => {
  let topicsById = {};
  let topicsIds = [];
  let authorsById = {};
  topics.forEach(item => {
    topicsById[item.id] = { ...item, author: item.author.id };
    topicsIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });
  return {
    topics: topicsById,
    topicsIds,
    authors: authorsById
  };
};

const convertSingleTopicToPlain = topic => {
  const plainTopic = { ...topic, author: topic.author.id };
  const author = { ...topic.author };
  return {
    topic: plainTopic,
    author
  };
};

// reducers
const allIds = (state = Immutable.fromJS([]), action) => {
  switch (action.type) {
    case types.FETCH_ALL_TOPICS:
      return Immutable.List(action.topicIds);
    case types.CREATE_TOPIC:
      return state.unshift(action.topic.id);
    default:
      return state;
  }
};

const byId = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case types.FETCH_ALL_TOPICS:
      return state.merge(action.topics);
    case types.FETCH_TOPIC:
    case types.CREATE_TOPIC:
    case types.UPDATE_TOPIC:
      return state.merge({ [action.topic.id]: action.topic });
    default:
      return state;
  }
};

const reducer = combineReducers({
  allIds,
  byId
});

export default reducer;

// selectors
export const getTopicList = state => {
  const allIds = state.getIn(["topics", "allIds"]);
  return allIds.map(id => {
    let topic = state.getIn(["topics", "byId", id]);
    return topic.merge({ author: getUserById(state, topic.get("author")) });
  });
};

export const getTopicById = (state, id) => {
  let topic  = state.getIn(["topics", "byId", id]);
  return topic
    ? topic.merge({ author: getUserById(state, topic.get("author")) })
    : null;
};
