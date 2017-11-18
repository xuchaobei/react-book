import { get, post, put } from "../utils/request";
import url from "../utils/url";

export default {
  getPostList: () => get(url.getPostList()),
  getPostById: id => get(url.getPostById(id)),
  createPost: data => post(url.createPost(), data),
  updatePost: (id, data) => put(url.updatePost(id), data)
};
