import React from "react";
import "./TopicItem.css";
import like from "./images/like-default.png";

function TopicItem(props) {
  const handleClick = () => {
    props.onVote(props.topic.id);
  };
  const { topic } = props;
  return (
    <li className='item'>
      <div className='title'>
        {topic.title}
      </div>
      <div>
        创建人：<span>{topic.author}</span>
      </div>
      <div>
        创建时间：<span>{topic.date}</span>
      </div>
      <div className='like'>
         <span><img alt='vote' src={like} onClick={handleClick} /></span>
         <span>{topic.vote}</span> 
      </div>
    </li>
  );
}

export default TopicItem;
