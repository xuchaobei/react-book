import { combineReducers } from "redux";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import comments, { getCommentIdsByPost, getCommentById } from "./comments";
import posts, { getPostIds, getPostById } from "./posts";
import users, { getUserById } from "./users";

// 合并所有模块的reducer成一个根reducer
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
  const postIds = getPostIds(state);
  return postIds.map(id => {
    const post = getPostById(state, id);
    return { ...post, author: getUserById(state, post.author) };
  });
};


export const getPostDetail = (state, id) => {
  const post = getPostById(state, id);
  return post ? { ...post, author: getUserById(state, post.author) } : null;
};

export const getCommentsWithAuthors = (state, postId) => {
  const commentIds = getCommentIdsByPost(state, postId);
  if (commentIds) {
    return commentIds.map(id => {
      const comment = getCommentById(state, id);
      return { ...comment, author: getUserById(state, comment.author) };
    });
  } else {
    return [];
  }
};