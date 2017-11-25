import React, { Component } from 'react';
import TodoItemView from "./TodoItem";
import { observer } from 'mobx-react';

@observer
class TodoListView extends Component {
  render() {
    const { todos } = this.props.todoStore;
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <TodoItemView key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;