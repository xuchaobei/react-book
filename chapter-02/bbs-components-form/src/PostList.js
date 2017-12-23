import React, { Component } from "react";
import PostItem from "./PostItem";
import "./PostList.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.timer = null;
    this.handleVote = this.handleVote.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // 用setTimeout模拟异步从服务器端获取数据
    this.timer = setTimeout(() => {
      this.setState({
        posts: [
          { id: 1, title: "大家一起来讨论React吧", author: "张三", date: "2017-09-01 10:00", vote: 0 },
          { id: 2, title: "前端框架，你最爱哪一个", author: "李四", date: "2017-09-01 12:00", vote: 0 },
          { id: 3, title: "Web App的时代已经到来", author: "王五", date: "2017-09-01 14:00", vote: 0 }
        ]
      });
    }, 1000);
  }

  componentWillUnmount() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }
  
  // 处理点赞逻辑
  handleVote(id) {
    const posts = this.state.posts.map(item => {
      const newItem = item.id === id ? {...item, vote: ++item.vote} : item;
      return newItem;
    })
    this.setState({
      posts
    })
  }

  // 保存帖子
  handleSave(post) {
    // 根据post的id，过滤出当前要更新的post
    const posts = this.state.posts.map(item => {
      const newItem = item.id === post.id ? post : item;
      return newItem;
    })
    this.setState({
      posts
    })
  }

  render() {
    return (
      <div className='container'>
        <h2>帖子列表</h2>
        <ul>
          {this.state.posts.map(item =>
            <PostItem
              key = {item.id}
              post = {item}
              onVote = {this.handleVote}
              onSave = {this.handleSave}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default PostList;
