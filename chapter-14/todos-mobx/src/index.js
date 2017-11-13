import React from "react";
import ReactDOM from "react-dom";
import * as mobx from "mobx";
import App from "./components/App";
import todoStore from "./stores/todoStore";

todoStore.addTodo("Initial todo1");
todoStore.addTodo("Initial todo2");
mobx.useStrict(true);

ReactDOM.render(<App todoStore={todoStore} />, document.getElementById("root"));

