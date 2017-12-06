import { observable, action } from "mobx";
import CommentModel from "../models/CommentModel";

class CommentsStore {
  api;
  appStore;
  authStore;
  @observable comments = [];

  constructor(api, appStore, authStore) {
    this.api = api;
    this.appStore = appStore;
    this.authStore = authStore;
  }

  @action fetchCommentList(postId) {
    this.appStore.increaseRequest();
    return this.api.getCommentList(postId).then(action(data => {
      this.appStore.decreaseRequest();
      if (!data.error) {
        this.comments.clear();
        data.forEach(item => this.comments.push(CommentModel.fromJS(this, item)));
        return Promise.resolve();
      } else {
        this.appStore.setError(data.error);
        return Promise.reject();
      }
    }));
  }
  
  @action createComment(content){
    this.appStore.increaseRequest();
    return this.api.createComment(content).then(action(data => {
      this.appStore.decreaseRequest();
      if (!data.error) {
        this.comments.unshift(CommentModel.fromJS(this, data));
        return Promise.resolve();
      } else {
        this.appStore.setError(data.error);
        return Promise.reject();
      }
    }));
  }
}

export default CommentsStore;