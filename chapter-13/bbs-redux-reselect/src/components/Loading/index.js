import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="loading">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>,
      this.container
    );
  }
}

export default Loading;
