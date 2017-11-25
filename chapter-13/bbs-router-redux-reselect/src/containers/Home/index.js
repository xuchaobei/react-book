import React, { Component } from "react";
import { Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../../components/Header";
import asyncComponent from "../../utils/AsyncComponent";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import connectRoute from "../../utils/connectRoute";

const AsyncPost = connectRoute(asyncComponent(() => import("../Post")));
const AsyncPostList = connectRoute(asyncComponent(() => import("../PostList")));

class Home extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    const { userId, username } = this.props.user;
    if (!userId || !username) {
      this.restoreLoginInfo();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  restoreLoginInfo = () => {
    const userId = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("username");
    if (userId && username) {
      this.props.setLoginInfo(userId, username);
    }
  };

  handleBeforeUnload = () => {
    const user = this.props.user;
    const userId = user.get("userId");
    const username = user.get("username");
    if (userId && username) {
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("username", username);
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { match, location, user } = this.props;
    const username = user && user.get("username") ? user.get("username") : "";
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
          render={props => <AsyncPostList {...props} />}
        />
        <Route
          path={`${match.url}/:id`}
          render={props => <AsyncPost {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
