import React, { Component } from "react";
import "./RemarkList.css";

class RemarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleClick(e) {
    const content = this.state.value;
    if (content.length > 0) {
      this.props.onSubmit(this.state.value);
      this.setState({
        value: ""
      });
    } else {
      alert("评论内容不能为空！");
    }
  }

  render() {
    const { remarks, username } = this.props;

    return (
      <div className="remarkList">
        <div className="title">评论</div>
        {username ? (
          <div className="editor">
            <textarea
              placeholder="说说你的看法"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
        <ul className="list">
          {remarks.map(item => {
            return (
              <li key={item.id}>
                <div>{item.content}</div>
                <div className="sub">
                  <span>{item.author}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RemarkList;
