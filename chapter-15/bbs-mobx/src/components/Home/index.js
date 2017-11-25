import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Header";
import asyncComponent from "../../utils/AsyncComponent";
import connectRoute from "../../utils/connectRoute";

const AsyncPost = connectRoute(asyncComponent(() => import("../Post")));
const AsyncPostList = connectRoute(asyncComponent(() => import("../PostList")));

class Home extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <div>
        <Header
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

export default Home;
