import React, { Component } from "react";
import TopicEditor from "./TopicEditor";
import RemarkList from "./RemarkList";
import { getFormatDate } from "../utils/date";
import "./Topic.css";
import like from "../images/like.png";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemarkSubmit = this.handleRemarkSubmit.bind(this);
    this.handleTopicSave = this.handleTopicSave.bind(this);
    this.handleTopicCancel = this.handleTopicCancel.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    setTimeout(() => {
      let topic = localStorage.getItem(`topics/${id}`);
      if (!topic) {
        fetch(`/mockdata/topics/${id}.json`)
          .then(response => {
            if (response.ok) {
              response.json().then(data => {
                this.setState({
                  topic: data
                });
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        topic = JSON.parse(topic);
        this.setState({
          topic
        });
      }
    }, 100);
  }

  handleEditClick() {
    this.setState({
      editing: true
    })
  }

  handleTopicSave(topic) {
    this.saveTopic(topic);
  }

  handleTopicCancel() {
    this.setState({
      editing: false
    })
  }

  handleRemarkSubmit(content) {
    const { topic } = this.state;
    const { username } = this.props;
    const remark = {
      id: topic.remarks.length + 1,
      author: username,
      content: content,
      date: getFormatDate()
    };
    let newTopic = {...topic, remarks: [].concat(remark, topic.remarks)};
    this.saveTopic(newTopic);
  }

  saveTopic(topic) {
    setTimeout(()=>{
      const id = this.props.match.params.id;
      localStorage.setItem(`topics/${id}`, JSON.stringify(topic));
      this.setState({
        topic,
        editing: false
      })
    }, 100);
  }

  render() {
    const { topic, editing } = this.state;
    const { username } = this.props;
    if (!topic) {
      return null;
    }
    return (
      <div className="topic">
        {editing ? (
          <TopicEditor topic={topic} onSave={this.handleTopicSave} onCancel={this.handleTopicCancel}/>
        ) : (
          <div>
            <h2>{topic.title}</h2>
            <div className="mark">
              <span className="author">{topic.author}</span>
              <span>·</span>
              <span>{topic.date}</span>
              {username === topic.author ? (
                <span>·<button onClick={this.handleEditClick}>编辑</button></span>
              ) : null}
            </div>
            <div className="content">{topic.content}</div>
          </div>
        )}
        <div className="vote">
          <span>
            <img alt="vote" src={like} />
          </span>
          <span>
            {topic.vote}
          </span>
        </div>
        <RemarkList remarks={topic.remarks}
          username = {username}
          onSubmit={this.handleRemarkSubmit}
        />
      </div>
    );
  }
}

export default Topic;
