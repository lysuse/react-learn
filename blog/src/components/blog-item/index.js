import React from 'react'
import { NavLink } from 'react-router-dom'
import './blog-item.scss'
const BlogItem = ({ blog }) => (
  <div className='blog-item'>
    <h2>
      <a href="">{blog.title}</a>
    </h2>
    <div className="blog-item-content">
      {blog.sourceContent.substring(0, 120) + '...'}
    </div>
    <div className="blog-item-footer">
      <ul className="blog-section">
        <li>
          <a href="">技术博文</a>
        </li>
        <li><a href="">&gt;Java技术</a></li>
      </ul>
      <NavLink to="/">posted {blog.createdDate}</NavLink>
      <NavLink to="/">阅读 ({blog.viewCount})</NavLink>
      <NavLink to="/">评论 ({blog.commentCount})</NavLink>
      <NavLink to="/">编辑</NavLink>
    </div>
  </div>
)

export default BlogItem
