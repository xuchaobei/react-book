import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopicItem from "./TopicItem";
import TopicEditor from "./TopicEditor";
import { get, post } from "../utils/request";
import url from "../utils/url";
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
    this.refreshTopicList = this.refreshTopicList.bind(this);
  }

  componentDidMount() {
    this.refreshTopicList();
  }

  refreshTopicList() {
    get(url.getTopicList()).then(data => {
      if (!data.error) {
        this.setState({
          topics: data,
          newTopic: false
        });
      }
    });
  }

  handleSave(data) {
    const topic = { ...data, author: this.props.userId, vote: 0 };
    post(url.createTopic(), topic).then(data => {
      if (!data.error) {
        this.refreshTopicList();
      }
    });
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
    const { userId } = this.props;
    return (
      <div className="topicList">
        <div>
          <h2>话题列表</h2>
          {userId ? <button onClick={this.handleNewTopic}>发帖</button> : null}
        </div>
        {this.state.newTopic ? (
          <TopicEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <ul>
          {this.state.topics.map(item => (
            <Link
              key={item.id}
              to={`/topics/${item.id}`}
            >
              <TopicItem topic={item} />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default TopicList;
