import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PostsView from "./PostsView";
import PostEditor from "../Post/PostEditor";
import "./style.css";

@inject("postsStore", "authStore", "uiStore")
@observer
class PostList extends Component {
  componentDidMount() {
    this.props.postsStore.fetchPostList();
  }

  handleSave = data => {
    this.props.postsStore
      .createPost(data)
      .then(() => this.props.uiStore.setAddDialogStatus(false));
  };

  handleCancel = () => {
    this.props.uiStore.setAddDialogStatus(false);
  };

  handleNewPost = () => {
    this.props.uiStore.setAddDialogStatus(true);
  };

  render() {
    const { postsStore, authStore, uiStore } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {authStore.userId ? (
            <button onClick={this.handleNewPost}>发帖</button>
          ) : null}
        </div>
        {uiStore.addDialogOpen ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <PostsView posts={postsStore.posts} />
      </div>
    );
  }
}

export default PostList;
