import { combineReducers } from "redux-immutable";
import { createSelector } from "reselect";
import Immutable from "immutable";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import comments, { getCommentIdsByPost, getComments } from "./comments";
import posts, { getPostIds, getPostList, getPostById } from "./posts";
import users, { getUsers } from "./users";

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
export const getPostListWithAuthors = createSelector(
  [getPostIds, getPostList, getUsers],
  (allIds, posts, users) => {
    return allIds.map(id => {
      let post = posts.get(id);
      return post.merge({ author: users.get(post.get("author")) });
    });
  }
);

export const getPostDetail = createSelector(
  [getPostById, getUsers],
  (post, users) => {
    return post
      ? post.merge({ author: users.get(post.get("author")) })
      : null;
  }
);

export const getCommentsWithAuthors = createSelector(
  [getCommentIdsByPost, getComments, getUsers],
  (commentIds, comments, users) => {
    if (commentIds) {
      return commentIds.map(id => {
        let comment = comments.get(id);
        return comment.merge({
          author: users.get(comment.get("author"))
        });
      });
    } else {
      return Immutable.List();
    }
  }
);
