import React from "react";
import { getFormatDate } from "../../../../utils/date";
import "./style.css";
import like from "../../../../images/like.png";

function TopicItem(props) {
  const { topic } = props;
  return (
    <li className="topicItem">
      <div className="title">{topic.title}</div>
      <div>
        创建人：<span>{topic.author.username}</span>
      </div>
      <div>
        更新时间：<span>{getFormatDate(topic.updatedAt)}</span>
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
