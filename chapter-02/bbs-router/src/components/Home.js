import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopicList from "./TopicList";
import Header from "./Header";
import Topic from "./Topic";
import { fakeLogin } from "./Login";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem("username")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    fakeLogin.logout(() => {
      this.setState({
        username: null
      });
    });
  }

  render() {
    const { match, location } = this.props;
    const { username } = this.state;
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
          render={props => <TopicList username={username} {...props} />}
        />
        <Route
          path={`${match.url}/:id`}
          render={props => <Topic username={username} {...props} />}
        />
      </div>
    );
  }
}

export default Home;
