import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PostsView from "./PostsView";
import PostEditor from "../Post/PostEditor";
import "./style.css";

@inject("postsStore", "authStore", "uiStore")
@observer
class PostList extends Component {
  componentDidMount() {
    // 获取帖子列表
    this.props.postsStore.fetchPostList();
  }

  // 保存新建的帖子
  handleSave = data => {
    this.props.postsStore
      .createPost(data)
      .then(() => this.props.uiStore.setAddDialogStatus(false));
  };

  // 取消新建帖子的状态
  handleCancel = () => {
    this.props.uiStore.setAddDialogStatus(false);
  };

  // 设置新建帖子的状态
  handleNewPost = () => {
    this.props.uiStore.setAddDialogStatus(true);
  };

  render() {
    const { postsStore, authStore, uiStore } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>帖子列表</h2>
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
