import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopicItem from "./TopicItem";
import TopicEditor from "./TopicEditor";
import { getFormatDate } from "../utils/date";
import "./TopicList.css";

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      newTopic: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewTopic = this.handleNewTopic.bind(this);
  }

  componentDidMount() {
    let topics = localStorage.getItem("topics");
    if (topics) {
      topics = JSON.parse(topics);
      this.setState({
        topics
      });
    } else {
      fetch("/mockdata/topics.json")
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({ topics: data });
              localStorage.setItem("topics", JSON.stringify(data));
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleSave(topic) {
    const topicId = this.state.topics.length + 1;
    const author = this.props.username;
    const topicItem = {
      id: topicId,
      title: topic.title,
      author: author,
      date: getFormatDate(),
      vote: 0
    };
    const topicDetail = { ...topicItem, content: topic.content, remarks: [] };
    const topics = [].concat(topicItem, this.state.topics);

    /* setTimeout 模拟异步网络请求 */
    setTimeout(() => {
      localStorage.setItem("topics", JSON.stringify(topics));
      this.setState({
        topics,
        newTopic: false
      });
    }, 100);

    setTimeout(() => {
      localStorage.setItem(`topics/${topicId}`, JSON.stringify(topicDetail));
    }, 100);
  }

  handleCancel() {
    this.setState({
      newTopic: false
    });
  }

  handleNewTopic() {
    this.setState({
      newTopic: true
    });
  }

  render() {
    const { username } = this.props;
    return (
      <div className="topicList">
        <div>
          <h2>话题列表</h2>
          {username && username.length > 0 ? (
            <button onClick={this.handleNewTopic}>发帖</button>
          ) : null}
        </div>
        {this.state.newTopic ? (
          <TopicEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <ul>
          {this.state.topics.map(item => (
            <Link key={item.id} to={`/topics/${item.id}`}>
              <TopicItem topic={item} />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default TopicList;
