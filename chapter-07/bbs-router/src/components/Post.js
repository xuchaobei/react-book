import React, { Component } from "react";
import PostEditor from "./PostEditor";
import PostView from "./PostView";
import CommentList from "./CommentList";
import { get, put, post } from "../utils/request";
import url from "../utils/url";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: [],
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handlePostSave = this.handlePostSave.bind(this);
    this.handlePostCancel = this.handlePostCancel.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
    this.refreshPost = this.refreshPost.bind(this);
  }

  componentDidMount() {
    this.refreshComments();
    this.refreshPost();
  }

  // 获取帖子详情
  refreshPost() {
    const postId = this.props.match.params.id;
    get(url.getPostById(postId)).then(data => {
      if (!data.error && data.length === 1) {
        this.setState({
          post: data[0]
        });
      }
    });
  }

  // 获取评论列表
  refreshComments() {
    const postId = this.props.match.params.id;
    get(url.getCommentList(postId)).then(data => {
      if (!data.error) {
        this.setState({
          comments: data
        });
      }
    });
  }

  // 让帖子处于编辑态
  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  // 保存帖子
  handlePostSave(data) {
    const id = this.props.match.params.id;
    this.savePost(id, data);
  }

  // 取消编辑帖子
  handlePostCancel() {
    this.setState({
      editing: false
    });
  }

  // 提交新建的评论
  handleCommentSubmit(content) {
    const postId = this.props.match.params.id;
    const comment = {
      author: this.props.userId,
      post: postId,
      content: content
    };
    this.saveComment(comment);
  }

  // 保存新的评论到服务器
  saveComment(comment) {
    post(url.createComment(), comment).then(data => {
      if (!data.error) {
        this.refreshComments();
      }
    });
  }

  // 同步帖子的修改到服务器
  savePost(id, post) {
    put(url.updatePost(id), post).then(data => {
      if (!data.error) {
        /* 因为返回的帖子对象只有author的id信息，
         * 所有需要额外把完整的author信息合并到帖子对象中 */
        const newPost = { ...data, author: this.state.post.author };
        this.setState({
          post: newPost,
          editing: false
        });
      }
    });
  }

  render() {
    const { post, comments, editing } = this.state;
    const { userId } = this.props;
    if (!post) {
      return null;
    }
    const editable = userId === post.author.id;
    return (
      <div className="post">
        {editing ? (
          <PostEditor
            post={post}
            onSave={this.handlePostSave}
            onCancel={this.handlePostCancel}
          />
        ) : (
          <PostView
            post={post}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <CommentList
          comments={comments}
          editable={Boolean(userId)}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default Post;
