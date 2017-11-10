import React, { Component } from 'react';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import './App.css';

class Todo {
  id = Math.random();
  @observable title;
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
