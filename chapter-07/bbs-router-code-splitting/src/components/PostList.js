import React, { Component } from "react";
import PostsView from "./PostsView";
import PostEditor from "./PostEditor";
import { get, post } from "../utils/request";
import url from "../utils/url";
import "./PostList.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.refreshPostList = this.refreshPostList.bind(this);
  }

  componentDidMount() {
    this.refreshPostList();
  }

  refreshPostList() {
    get(url.getPostList()).then(data => {
      if (!data.error) {
        this.setState({
          posts: data,
          newPost: false
        });
      }
    });
  }

  handleSave(data) {
    const postData = { ...data, author: this.props.userId, vote: 0 };
    post(url.createPost(), postData).then(data => {
      if (!data.error) {
        this.refreshPostList();
      }
    });
  }

  handleCancel() {
    this.setState({
      newPost: false
    });
  }

  handleNewPost() {
    this.setState({
      newPost: true
    });
  }

  render() {
    const { userId } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {userId ? <button onClick={this.handleNewPost}>发帖</button> : null}
        </div>
        {this.state.newPost ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <PostsView posts={this.state.posts} />
      </div>
    );
  }
}

export default PostList;
