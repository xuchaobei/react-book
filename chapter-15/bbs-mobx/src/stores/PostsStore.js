import { observable, action, toJS } from "mobx";
import PostModel from "../models/PostModel";

class PostsStore {
  api;
  appStore;
  authStore;
  @observable posts = [];

  constructor(api, appStore, authStore) {
    this.api = api;
    this.appStore = appStore;
    this.authStore = authStore;
  }

  getPost(id) {
    return this.posts.find(item => item.id === id);
  }

  @action
  fetchPostList() {
    this.appStore.increaseRequest();
    return this.api.getPostList().then(
      action(data => {
        this.appStore.decreaseRequest();
        if (!data.error) {
          this.posts.clear();
          data.forEach(post => this.posts.push(PostModel.fromJS(this, post)));
          return Promise.resolve();
        } else {
          this.appStore.setError(data.error);
          return Promise.reject();
        }
      })
    );
  }

  @action
  fetchPostDetail(id) {
    this.appStore.increaseRequest();
    return this.api.getPostById(id).then(
      action(data => {
        this.appStore.decreaseRequest();
        if (!data.error && data.length === 1) {
          const post = this.getPost(id);
          if (post) {
            post.updateFromJS(data[0]);
          } else {
            this.posts.push(PostModel.fromJS(this, data[0]));
          }
          return Promise.resolve();
        } else {
          this.appStore.setError(data.error);
          return Promise.reject();
        }
      })
    );
  }

  @action
  createPost(post) {
    const content = { ...post, author: this.authStore.userId, vote: 0 };
    this.appStore.increaseRequest();
    return this.api.createPost(content).then(
      action(data => {
        this.appStore.decreaseRequest();
        if (!data.error) {
          this.posts.unshift(PostModel.fromJS(this, data));
          return Promise.resolve();
        } else {
          this.appStore.setError(data.error);
          return Promise.reject();
        }
      })
    );
  }

  @action
  updatePost(id, post) {
    this.appStore.increaseRequest();
    return this.api.updatePost(id, post).then(
      action(data => {
        this.appStore.decreaseRequest();
        if (!data.error) {
          const oldPost = this.getPost(id);
          if (oldPost) {
            data.author = toJS(oldPost.author);
            oldPost.updateFromJS(data);
          } 
          return Promise.resolve();
        } else {
          this.appStore.setError(data.error);
          return Promise.reject();
        }
      })
    );
  }
}

export default PostsStore;
