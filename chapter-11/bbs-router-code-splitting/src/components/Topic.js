import React, { Component } from "react";
import TopicEditor from "./TopicEditor";
import TopicViewer from "./TopicViewer";
import RemarkList from "./RemarkList";
import { get, put, post } from "../utils/request";
import url from "../utils/url";
import "./Topic.css";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      remarks: [],
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemarkSubmit = this.handleRemarkSubmit.bind(this);
    this.handleTopicSave = this.handleTopicSave.bind(this);
    this.handleTopicCancel = this.handleTopicCancel.bind(this);
    this.refreshRemarks = this.refreshRemarks.bind(this);
    this.refreshTopic = this.refreshTopic.bind(this);
  }

  componentDidMount() {
    this.refreshRemarks();
    this.refreshTopic();
  }

  refreshTopic() {
    const topicId = this.props.match.params.id;
    get(url.getTopicById(topicId)).then(data => {
      if (!data.error && data.length === 1) {
        this.setState({
          topic: data[0]
        });
      }
    });
  }

  refreshRemarks() {
    const topicId = this.props.match.params.id;
    get(url.getRemarkList(topicId)).then(data => {
      if (!data.error) {
        this.setState({
          remarks: data
        });
      }
    });
  }

  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  handleTopicSave(data) {
    const id = this.props.match.params.id;
    this.saveTopic(id, data);
  }

  handleTopicCancel() {
    this.setState({
      editing: false
    });
  }

  handleRemarkSubmit(content) {
    const topicId = this.props.match.params.id;
    const remark = {
      author: this.props.userId,
      topic: topicId,
      content: content
    };
    this.saveRemark(remark);
  }

  saveRemark(remark) {
    post(url.createRemark(), remark).then(data => {
      if (!data.error) {
        this.refreshRemarks();
      }
    });
  }

  saveTopic(id, topic) {
    put(url.updateTopic(id), topic).then(data => {
      if (!data.error) {
        const newTopic = { ...data, author: this.state.topic.author };
        this.setState({
          topic: newTopic,
          editing: false
        });
      }
    });
  }

  render() {
    const { topic, remarks, editing } = this.state;
    const { userId } = this.props;
    if (!topic) {
      return null;
    }
    const editable = userId === topic.author.id;
    return (
      <div className="topic">
        {editing ? (
          <TopicEditor
            topic={topic}
            onSave={this.handleTopicSave}
            onCancel={this.handleTopicCancel}
          />
        ) : (
          <TopicViewer
            topic={topic}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <RemarkList
          remarks={remarks}
          editable={Boolean(userId)}
          onSubmit={this.handleRemarkSubmit}
        />
      </div>
    );
  }
}

export default Topic;
