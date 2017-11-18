import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "./AsyncComponent";

const AsyncHome = asyncComponent(() => import("./components/Home"));
const AsyncLogin = asyncComponent(() => import("./components/Login"));

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route path="/login" component={AsyncLogin} />
          <Route path="/posts" component={AsyncHome} />
        </Switch>
      </Router>
    );
  }
}

export default App;
