import React, { Component } from "react";

class PostList extends Component {
  render() {
    return (
      <div>
        帖子列表：
        <ul>
          <li>大家一起来讨论React吧</li>
          <li>前端框架，你最爱哪一个</li>
          <li>Web App的时代已经到来</li>
        </ul>
      </div>
    );
  }
}

export default PostList;
