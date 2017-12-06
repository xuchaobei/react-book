import { observable, computed, action } from "mobx";

class TodoStore {
  @observable todos = [];

  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
 
  @action addTodo(data) {
    this.todos.push(new Todo(data));
  }
}

class Todo {
  id = Math.random();
  @observable title;
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }

  @action toggle() {
    this.finished = !this.finished;
  }
}

export default new TodoStore();

