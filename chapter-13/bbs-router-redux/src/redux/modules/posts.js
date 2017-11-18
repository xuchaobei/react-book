import { combineReducers } from "redux";
import { get, put, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
  byId: {},
  allIds: []
};

// action types
export const types = {
  CREATE_TOPIC: "TOPICS/CREATE_TOPIC",
  UPDATE_TOPIC: "TOPICS/UPDATE_TOPIC",
  FETCH_ALL_TOPICS: "TOPICS/FETCH_ALL_TOPICS",
  FETCH_TOPIC: "TOPICS/FETCH_TOPIC"
};

// action creators
export const actions = {
  fetchAllPosts: () => {
    return (dispatch, getState) => {
      if (shouldFetchAllPosts(getState())) {
        dispatch(appActions.startRequest());
        return get(url.getPostList()).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { posts, postsIds, authors } = convertPostsToPlain(data);
            dispatch(fetchAllPostsSuccess(posts, postsIds, authors));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  fetchPost: id => {
    return (dispatch, getState) => {
      if (shouldFetchPost(id, getState())) {
        dispatch(appActions.startRequest());
        return get(url.getPostById(id)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error && data.length === 1) {
            const { post, author } = convertSinglePostToPlain(data[0]);
            dispatch(fetchPostSuccess(post, author));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  createPost: (title, content) => {
    return (dispatch, getState) => {
      const state = getState();
      const author = state.auth.userId;
      const params = {
        author,
        title,
        content,
        vote: 0
      };
      dispatch(appActions.startRequest());
      return post(url.createPost(), params).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(createPostSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  updatePost: (id, post) => {
    return dispatch => {
      dispatch(appActions.startRequest());
      return put(url.updatePost(id), post).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(updatePostSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  }
};

const fetchAllPostsSuccess = (posts, postIds, authors) => ({
  type: types.FETCH_ALL_TOPICS,
  posts,
  postIds,
  users: authors
});

const fetchPostSuccess = (post, author) => ({
  type: types.FETCH_TOPIC,
  post,
  user: author
});

const createPostSuccess = post => ({
  type: types.CREATE_TOPIC,
  post: post
});

const updatePostSuccess = post => ({
  type: types.UPDATE_TOPIC,
  post: post
});

const shouldFetchAllPosts = state => {
  return !state.posts.allIds || state.posts.allIds.length === 0;
};

const shouldFetchPost = (id, state) => {
  /** 
   * state中如果已经存在该post对象，且有content字段，
   * 则表明state中已经有该post的完整信息，无需再次发送请求 
  **/
  return !state.posts.byId[id] || !state.posts.byId[id].content;
};

const convertPostsToPlain = posts => {
  let postsById = {};
  let postsIds = [];
  let authorsById = {};
  posts.forEach(item => {
    postsById[item.id] = { ...item, author: item.author.id };
    postsIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });
  return {
    posts: postsById,
    postsIds,
    authors: authorsById
  };
};

const convertSinglePostToPlain = post => {
  const plainPost = { ...post, author: post.author.id };
  const author = { ...post.author };
  return {
    post: plainPost,
    author
  };
};

// reducers
const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_TOPICS:
      return action.postIds;
    case types.CREATE_TOPIC:
      return [action.post.id, ...state];
    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_ALL_TOPICS:
      return action.posts;
    case types.FETCH_TOPIC:
    case types.CREATE_TOPIC:
    case types.UPDATE_TOPIC:
      return {
        ...state,
        [action.post.id]: action.post
      };
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
export const getPostIds = state => state.posts.allIds;

export const getPostList = state => state.posts.byId;

export const getPostById = (state, id) => state.posts.byId[id];
