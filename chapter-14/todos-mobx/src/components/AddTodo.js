import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.input = "";
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }
    this.props.todoStore.addTodo(this.input.value);
    this.input.value = "";
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={node => {
              this.input = node;
            }}
          />
          <button type="submit">新增</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;