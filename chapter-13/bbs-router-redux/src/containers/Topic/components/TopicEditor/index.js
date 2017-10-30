import React, { Component } from "react";
import "./style.css";

class TopicEditor extends Component {
  constructor(props) {
    super(props);
    const { topic } = this.props;
    this.state = {
      title: (topic && topic.title) || '',
      content: (topic && topic.content) || ''
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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

  handleCancelClick() {
    this.props.onCancel();
  }

  handleSaveClick() {
    let data = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.onSave(data);
  }

  render() {
    return (
      <div className="topicEditor">
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

export default TopicEditor;
