import React from "react";
import PropTypes from 'prop-types';

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

TopicItem.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    vote: PropTypes.number
  }).isRequired,
  onVote: PropTypes.func.isRequired
}

export default TopicItem;
