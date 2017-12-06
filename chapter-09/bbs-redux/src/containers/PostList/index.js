import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PostsView from "./components/PostsView";
import PostEditor from "../Post/components/PostEditor";
import { getLoggedUser } from "../../redux/modules/auth";
import { actions as postActions } from "../../redux/modules/posts";
import { actions as uiActions, isAddDialogOpen } from "../../redux/modules/ui";
import { getPostListWithAuthors } from "../../redux/modules";
import "./style.css";

class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();  // 获取帖子列表
  }

  // 保存帖子
  handleSave = data => {
    this.props.createPost(data.title, data.content);
  };

  // 取消新建帖子
  handleCancel = () => {
    this.props.closeAddDialog();
  };

  // 新建帖子
  handleNewPost = () => {
    this.props.openAddDialog();
  };

  render() {
    const { posts, user, isAddDialogOpen } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {user.userId ? (
            <button onClick={this.handleNewPost}>发帖</button>
          ) : null}
        </div>
        {isAddDialogOpen ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <PostsView posts={posts}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    posts: getPostListWithAuthors(state),
    isAddDialogOpen: isAddDialogOpen(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
