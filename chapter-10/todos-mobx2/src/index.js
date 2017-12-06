@observer
class MyComponent extends Component {
  render() {
    const { todos, user } = this.props;
    return (
      <div>
        {user.name}
        <TodosView todos={todos} />
      </div>
    );
  }
}

@observer
class TodosView extends Component {
  render() {
    const { todos } = this.props;
    return <ul>{todos.map(todo => <TodoView todo={todo} key={todo.id} />)}</ul>;
  }
}
