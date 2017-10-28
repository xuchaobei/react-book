import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TopicItem from "../components/TopicItem";
import TopicEditor from "../components/TopicEditor";
import { getLoggedUser } from "../redux/modules/auth";
import { actions as topicActions, getTopicList } from "../redux/modules/topics";
import { actions as uiActions, isAddDialogOpen } from "../redux/modules/ui";
import "./TopicList.css";

class TopicList extends Component {
  componentDidMount() {
    this.props.fetchAllTopics();
  }

  handleSave = data => {
    this.props.createTopic(data.title, data.content);
  };

  handleCancel = () => {
    this.props.closeAddDialog();
  };

  handleNewTopic = () => {
    this.props.openAddDialog();
  };

  render() {
    const { topics, user, isAddDialogOpen } = this.props;
    return (
      <div className="topicList">
        <div>
          <h2>话题列表</h2>
          {user.userId ? (
            <button onClick={this.handleNewTopic}>发帖</button>
          ) : null}
        </div>
        {isAddDialogOpen ? (
          <TopicEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <ul>
          {topics.map(item => (
            <Link key={item.id} to={`/topics/${item.id}`}>
              <TopicItem topic={item} />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    topics: getTopicList(state),
    isAddDialogOpen: isAddDialogOpen(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(topicActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
