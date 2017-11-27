import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <span className="close" onClick={this.props.onClose}>
          &times;
        </span>
        <div className="content">{this.props.children}</div>
      </div>,
      this.container
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>Modal Dialog </Modal>
        )}
      </div>
    );
  }
}

export default App;
