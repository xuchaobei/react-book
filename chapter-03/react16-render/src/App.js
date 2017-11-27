import React, { Component } from "react";

export default class App extends Component {
  render() {
    return [
      <ul>
        <ListComponent />
      </ul>,
      <StringComponent />
    ];
  }
}

class ListComponent extends Component {
  render() {
    return [
      <li key="A">First item</li>,
      <li key="B">Second item</li>,
      <li key="C">Third item</li>
    ];
  }
}

class StringComponent extends Component {
  render() {
    return "Just a strings";
  }
}
