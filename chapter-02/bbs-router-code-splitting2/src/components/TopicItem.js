import React from "react";
import "./TopicItem.css";
import like from "../images/like.png";

function TopicItem(props) {
  const { topic } = props;
  return (
    <li className="topicItem">
      <div className="title">{topic.title}</div>
      <div>
        创建人：<span>{topic.author}</span>
      </div>
      <div>
        创建时间：<span>{topic.date}</span>
      </div>
      <div className="like">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{topic.vote}</span>
      </div>
    </li>
  );
}

export default TopicItem;
