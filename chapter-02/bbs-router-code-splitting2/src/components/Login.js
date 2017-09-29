import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if(username.length === 0 || password.length === 0) {
      alert("用户名或密码不能为空！");
      return;
    }
    fakeLogin.login(this.state.username, this.state.password, () => {
      this.setState({
        redirectToReferrer: true
      })
    });
  }

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

export const fakeLogin = {
  login(username, password, cb) {
    sessionStorage.setItem("username", username);
    setTimeout(cb, 100); // 模拟登录异步过程
  },
  logout(cb) {
    sessionStorage.removeItem("username");
    setTimeout(cb, 100);
  }
};

export default Login;
