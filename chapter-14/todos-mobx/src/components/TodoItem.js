import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class TodoItem extends Component {
  handleClick = () => {
    this.props.todo.toggle();
  };

  render() {
    const { todo } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.finished}
          onClick={this.handleClick}
        />
        {todo.title}
      </li>
    );
  }
}

export default TodoItem;
