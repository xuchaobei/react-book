import { get, post } from "../utils/request";
import url from "../utils/url";

export default {
  getCommentList: postId => get(url.getCommentList(postId)),
  createComment: data => post(url.createComment(), data)
};
