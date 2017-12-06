import React, { Component } from 'react';
import TodoItem from "./TodoItem";
import { observer } from 'mobx-react';

@observer
class TodoList extends Component {
  render() {
    const { todos } = this.props.todoStore;
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;