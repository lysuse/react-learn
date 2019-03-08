import React from 'react'
import './index.scss'

const CommentItem = props => {
  const comment = props.comment || {}
  return (
    <div className="comment-item">
      <h3>{comment.name} 说:</h3>
      <p>{comment.content}</p>
      <div className="comment-item-date">{comment.createdDate}</div>
    </div>
  )
}

export default CommentItem