import React, { Component } from 'react';
import { observer } from "mobx-react";

@observer
class Footer extends Component {
  render() {
    return (
      <div>
        剩余任务: {this.props.todoStore.unfinishedTodoCount}
      </div>
    );
  }
}

export default Footer;