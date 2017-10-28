import React from "react";

function TopicItem(props) {
  const handleClick = () => {
    props.onVote(props.topic.id);
  };
  const { topic } = props;
  return (
    <li>
      <div>
        {topic.title}
      </div>
      <div>
        创建人：<span>{topic.author}</span>
      </div>
      <div>
        创建时间：<span>{topic.date}</span>
      </div>
      <div>
        <button onClick={handleClick}>点赞</button>
        &nbsp;
        <span>{topic.vote}</span>
      </div>
    </li>
  );
}

export default TopicItem;
