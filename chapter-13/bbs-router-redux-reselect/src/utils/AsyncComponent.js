import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentDidMount() {
      importComponent().then((mod) => {
        this.setState({
          // 同时兼容ES6和CommonJS的模块
          component: mod.default ? mod.default : mod
        });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}