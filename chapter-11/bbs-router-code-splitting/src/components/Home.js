import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import asyncComponent from "../AsyncComponent";

const AsyncTopic = asyncComponent(() => import("./Topic"));
const AsyncTopicList = asyncComponent(() => import("./TopicList"));

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // 注销用户
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    this.setState({
      userId: null,
      username: null
    });
  }

  render() {
    const { match, location } = this.props;
    const { userId, username } = this.state;
    return (
      <div>
        <Header
          username={username}
          onLogout={this.handleLogout}
          location={location}
        />
        <Route
          path={match.url}
          exact
          render={props => <AsyncTopicList userId={userId} {...props} />}
        />
        <Route
          path={`${match.url}/:id`}
          render={props => <AsyncTopic userId={userId} {...props} />}
        />
      </div>
    );
  }
}

export default Home;
