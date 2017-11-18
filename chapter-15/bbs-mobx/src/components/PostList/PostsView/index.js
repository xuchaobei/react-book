import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";
import PostItem from "../PostItem";

@observer
class PostsView extends Component {
  render() {
    const { posts } = this.props
    return (
      <ul>
        {posts.map(item => (
          <Link key={item.id} to={`/posts/${item.id}`}>
            <PostItem post={item} />
          </Link>
        ))}
      </ul>
    );
  }
}

export default PostsView;