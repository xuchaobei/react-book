import React, { Component } from "react";

const Profile = ({ user }) => <div>name: {user.name}</div>;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(err, info) {
    this.setState({ hasError: true });
    console.log(err, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops, something went wrong!</h1>;
    }
    return this.props.children;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { name: "react" }
    };
  }

  onClick = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Profile user={this.state.user} />
        </ErrorBoundary>
        <button onClick={this.onClick}>更新</button>
      </div>
    );
  }
}

export default App;
