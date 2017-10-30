import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import asyncComponent from "../../utils/AsyncComponent";
import ModalDialog from "../../components/ModalDialog";
import Loading from "../../components/Loading";
import { actions as appActions } from "../../redux/modules/app";

const AsyncHome = asyncComponent(() => import("../Home"));
const AsyncLogin = asyncComponent(() => import("../Login"));

class App extends Component {
  render() {
    const { app } = this.props;
    const errorDialog = app.error && (
      <ModalDialog onClose={this.props.removeError}>
        {app.error.message || app.error}
      </ModalDialog>
    );

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/login" component={AsyncLogin} />
            <Route path="/topics" component={AsyncHome} />
          </Switch>
        </Router>
        {errorDialog}
        {app.requestQuantity > 0 && <Loading />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
