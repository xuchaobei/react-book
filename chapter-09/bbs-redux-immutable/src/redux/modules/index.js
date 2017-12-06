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
// 获取包含完整作者信息的帖子列表
export const getPostListWithAuthors = state => {
  const allIds = getPostIds(state);
  return allIds.map(id => {
    const post = getPostById(state, id);
    return post.merge({ author: getUserById(state, post.get("author")) });
  });
};

// 获取帖子详情
export const getPostDetail = (state, id) => {
  const post = getPostById(state, id);
  return post
    ? post.merge({ author: getUserById(state, post.get("author")) })
    : null;
};

// 获取包含完整作者信息的评论列表
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
