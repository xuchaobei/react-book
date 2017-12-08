import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "jack",
      password: "123456",
      redirectToReferrer: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const isLoggedIn = !this.props.user.get("userId") && nextProps.user.get("userId");
    if (isLoggedIn) {
      this.setState({
        redirectToReferrer: true
      });
    }
  }

  handleChange = e => {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    } else {
      // do nothing
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (username.length === 0 || password.length === 0) {
      alert("用户名或密码不能为空！");
      return;
    }
    // 如果当前已有用户登录，先注销
    if (this.props.user.userId) {
      this.props.logout();
    }
    this.props.login(username, password);
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div>
          <label>
            用户名：
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            密码：
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="登录" />
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
