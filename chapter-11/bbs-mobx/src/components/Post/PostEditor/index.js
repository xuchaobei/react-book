import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import "./style.css";

@observer
class PostEditor extends Component {
  @observable title;
  @observable content;

  constructor(props) {
    super(props);
    const { post } = this.props;
    this.title = (post && post.title) || "";
    this.content = (post && post.content) || "";
  }

  @action handleChange = e => {
    const name = e.target.name;
    if (name === "title") {
      this.title = e.target.value;
    } else if (name === "content") {
      this.content = e.target.value;
    } else {
    }
  };

  handleCancelClick = () => {
    this.props.onCancel();
  };

  handleSaveClick = () => {
    const data = {
      title: this.title,
      content: this.content
    };
    this.props.onSave(data);
  };

  render() {
    return (
      <div className="postEditor">
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={this.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"
          placeholder="内容"
          value={this.content}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default PostEditor;
