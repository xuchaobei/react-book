import { observable } from "mobx";

class CommentModel {
  store;
  id;
  @observable content;
  @observable author;
  @observable createdAt;
  @observable updatedAt;

  constructor(store, id, content, author, createdAt, updatedAt) {
    this.store = store;
    this.id = id;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJS(store, object) {
    return new CommentModel(
      store,
      object.id,
      object.content,
      object.author,
      object.createdAt,
      object.updatedAt
    );
  }
}

export default CommentModel;