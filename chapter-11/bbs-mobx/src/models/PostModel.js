import { observable, action } from "mobx";

class PostModel {
  store;
  id;
  @observable title;
  @observable content;
  @observable vote;
  @observable author;
  @observable createdAt;
  @observable updatedAt;

  constructor(store, id, title, content, vote, author, createdAt, updatedAt) {
    this.store = store;
    this.id = id;
    this.title = title;
    this.content = content;
    this.vote = vote;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  // 根据JSON对象更新帖子
  @action updateFromJS(json) {
    this.title = json.title;
    this.content = json.content;
    this.vote = json.vote;
    this.author = json.author;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  // 静态方法，创建新的PostModel实例
  static fromJS(store, object) {
    return new PostModel(
      store,
      object.id,
      object.title,
      object.content,
      object.vote,
      object.author,
      object.createdAt,
      object.updatedAt
    );
  }

}

export default PostModel;
