import React, { Component } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

class App extends Component {
  renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default;
      return <DevTools />;
    }
  }

  render() {
    const { todoStore } = this.props;
    return (
      <div className="App">
        <AddTodo todoStore={todoStore} />
        <TodoList todoStore={todoStore} />
        <Footer todoStore={todoStore} />
        {this.renderDevTool()}
      </div>
    );
  }
}

export default App;
