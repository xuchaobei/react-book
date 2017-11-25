import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import asyncComponent from "../../utils/AsyncComponent";
import ModalDialog from "../../components/ModalDialog";
import Loading from "../../components/Loading";
import { actions as appActions, getError, getRequestQuantity } from "../../redux/modules/app";
import connectRoute from "../../utils/connectRoute";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));

class App extends Component {
  render() {
    const { error, requestQuantity } = this.props;
    const errorDialog = error && (
      <ModalDialog onClose={this.props.removeError}>
        {error.message || error}
      </ModalDialog>
    );

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/login" component={AsyncLogin} />
            <Route path="/posts" component={AsyncHome} />
          </Switch>
        </Router>
        {errorDialog}
        {requestQuantity > 0 && <Loading />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state),
    requestQuantity: getRequestQuantity(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
