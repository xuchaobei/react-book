import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observable, action } from "mobx";
import { inject, observer } from "mobx-react";
import "./style.css";

@inject("authStore")
@observer
class Login extends Component {
  @observable redirectToReferrer = false;

  handleChange = e => {
    if (e.target.name === "username") {
      this.props.authStore.setUsername(e.target.value);
    } else if (e.target.name === "password") {
      this.props.authStore.setPassword(e.target.value);
    } else {
      // do nothing
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.authStore
      .login()
      .then(action(() => (this.redirectToReferrer = true)));
  };

  render() {
    if (this.redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return <Redirect to={from} />;
    }
    const { username, password } = this.props.authStore;
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div>
          <label>
            用户名：
            <input
              name="username"
              type="text"
              value={username}
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
              value={password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="登录" />
      </form>
    );
  }
}

export default Login;
