import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import CommentsView from "../CommentsView";
import "./style.css";

@inject("commentsStore", "authStore")
@observer
class CommentList extends Component {
  @observable newComment;

  componentDidMount() {
    this.props.commentsStore.fetchCommentList(this.props.postId);
  }

  @action
  handleChange = e => {
    this.newComment = e.target.value;
  };

  handleClick = e => {
    if (this.newComment.length > 0) {
      const postId = this.props.postId;
      const userId = this.props.authStore.userId;
      const comment = {
        author: userId,
        post: postId,
        content: this.newComment
      };
      this.props.commentsStore.createComment(comment).then(
        action(() => {
          this.newComment = "";
        })
      );
    } else {
      alert("评论内容不能为空！");
    }
  };

  render() {
    const { commentsStore, authStore } = this.props;
    return (
      <div className="commentList">
        <div className="title">评论</div>
        {authStore.userId ? (
          <div className="editor">
            <textarea
              placeholder="说说你的看法"
              value={this.newComment}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
        <CommentsView comments={commentsStore.comments} />
      </div>
    );
  }
}

export default CommentList;
