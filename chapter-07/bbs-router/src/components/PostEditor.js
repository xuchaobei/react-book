import React, { Component } from "react";
import "./PostEditor.css";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = {
      title: (post && post.title) || "",
      content: (post && post.content) || ""
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 处理帖子的编辑信息
  handleChange(e) {
    const name = e.target.name;
    if (name === "title") {
      this.setState({
        title: e.target.value
      });
    } else if (name === "content") {
      this.setState({
        content: e.target.value
      });
    } else {
    }
  }
  
  // 取消帖子的编辑
  handleCancelClick() {
    this.props.onCancel();
  }
  
  // 保存帖子
  handleSaveClick() {
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    // 调用父组件的回调函数执行真正的保存逻辑
    this.props.onSave(data);
  }

  render() {
    return (
      <div className="postEditor">
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"
          placeholder="内容"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default PostEditor;
