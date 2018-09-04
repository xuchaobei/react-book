import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import "./style.css";

@inject("authStore")
@observer
class Header extends Component {
  render() {
    const { authStore, location } = this.props;
    return (
      <div className="header">
        <div className="nav">
          <span className="left-link">
            <Link to="/">首页</Link>
          </span>
          {authStore.userId && authStore.userId.length > 0 ? (
            <span className="user">
              当前用户：{authStore.username}&nbsp;<button onClick={authStore.logout}>
                注销
              </button>
            </span>
          ) : (
            <span className="right-link">
              <Link to={{ pathname: "/login", state: { from: location } }}>
                登录
              </Link>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
