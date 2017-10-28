import React, { Component } from "react";
import "./TopicItem.css";
import like from "./images/like-default.png";

class TopicItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      topic: props.topic
    };
    this.handleVote = this.handleVote.bind(this);
    this.handleEditTopic = this.handleEditTopic.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps.props) {
      this.setState({
        topic: nextProps.topic
      });
    }
  }

  handleVote() {
    this.props.onVote(this.props.topic.id);
  }

  handleEditTopic() {
    const editing = this.state.editing;
    if (editing) {
      this.props.onSave({
        ...this.state.topic,
        date: this.getFormatDate()
      });
    }
    this.setState({
      editing: !editing
    });
  }

  handleTitleChange(event) {
    const newTopic = { ...this.state.topic, title: event.target.value };
    this.setState({
      topic: newTopic
    });
  }

  getFormatDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1 + "";
    month = month.length === 1 ? "0" + month : month;
    let day = date.getDate() + "";
    day = day.length === 1 ? "0" + day : day;
    let hour = date.getHours() + "";
    hour = hour.length === 1 ? "0" + hour : hour;
    let minute = date.getMinutes() + "";
    minute = minute.length === 1 ? "0" + minute : minute;
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  render() {
    const { topic } = this.state;
    return (
      <li className="item">
        <div className="title">
          {this.state.editing
            ? <form>
                <textarea
                  value={topic.title}
                  onChange={this.handleTitleChange}
                />
              </form>
            : topic.title}
        </div>
        <div>
          创建人：<span>{topic.author}</span>
        </div>
        <div>
          创建时间：<span>{topic.date}</span>
        </div>
        <div className="like">
          <span>
            <img alt="vote" src={like} onClick={this.handleVote} />
          </span>
          <span>
            {topic.vote}
          </span>
        </div>
        <div>
          <button onClick={this.handleEditTopic}>
            {this.state.editing ? "保存" : "编辑"}
          </button>
        </div>
      </li>
    );
  }
}

export default TopicItem;
