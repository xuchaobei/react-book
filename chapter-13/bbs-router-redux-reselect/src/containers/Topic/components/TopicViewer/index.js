import React from "react";
import { getFormatDate } from "../../../../utils/date";
import "./style.css";
import like from "../../../../images/like.png";

function TopicViewer(props) {
  const { topic, editable, onEditClick } = props;
  return (
    <div className="topicViewer">
      <div>
        <h2>{topic.title}</h2>
        <div className="mark">
          <span className="author">{topic.author.username}</span>
          <span>·</span>
          <span>{getFormatDate(topic.updatedAt)}</span>
          {editable ? (
            <span>
              ·<button onClick={onEditClick}>编辑</button>
            </span>
          ) : null}
        </div>
        <div className="content">{topic.content}</div>
      </div>
      <div className="vote">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{topic.vote}</span>
      </div>
    </div>
  );
}

export default TopicViewer;
