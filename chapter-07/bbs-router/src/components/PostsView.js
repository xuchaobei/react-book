import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

class PostsView extends Component {
  render() {
    const { posts } = this.props
    return (
      <ul>
        {posts.map(item => (
          // 使用Link组件包裹每一个PostItem
          <Link key={item.id} to={`/posts/${item.id}`}>
            <PostItem post={item} />
          </Link>
        ))}
      </ul>
    );
  }
}

export default PostsView;