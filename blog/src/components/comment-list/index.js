import React from 'react'
import CommentItem from '../comment-item'
import './index.scss'

const CommentList = props => {
  return (
    <div className="comment-list">
      <h3>留言({props.total})</h3>
      {props.comments.map(comment => (
        <CommentItem comment={comment} key={`comment_${props.articleId}_data_${comment.id}`} />
      ))}
      <a href="javascript:void(0);" onClick={props.loadMoreComment}>加载更多</a>
    </div>
  )
}

export default CommentList