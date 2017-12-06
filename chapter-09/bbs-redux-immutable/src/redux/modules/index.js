import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import comments, { getCommentIdsByPost, getCommentById } from "./comments";
import posts, { getPostIds, getPostById } from "./posts";
import users, { getUserById } from "./users";

const rootReducer = combineReducers({
  app,
  auth,
  ui,
  posts,
  comments,
  users
});

export default rootReducer;

// complex selectors
export const getPostListWithAuthors = state => {
  const allIds = getPostIds(state);
  return allIds.map(id => {
    const post = getPostById(state, id);
    return post.merge({ author: getUserById(state, post.get("author")) });
  });
};

export const getPostDetail = (state, id) => {
  const post = getPostById(state, id);
  return post
    ? post.merge({ author: getUserById(state, post.get("author")) })
    : null;
};

export const getCommentsWithAuthors = (state, postId) => {
  const commentIds = getCommentIdsByPost(state, postId);
  if (commentIds) {
    return commentIds.map(id => {
      const comment = getCommentById(state, id);
      return comment.merge({ author: getUserById(state, comment.get("author")) });
    });
  } else {
    return Immutable.List();
  }
};
