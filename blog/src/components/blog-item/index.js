import React from 'react'
import {NavLink} from 'react-router-dom'
import './blog-item.scss'
const BlogItem = ({blog}) => (<div className='blog-item'>
  <h2>
    <a href={`/article/${blog.rootSectionId}/${blog.secondSectionId}/${blog.id}`}>{blog.title}</a>
  </h2>
  <div className="blog-item-content">{blog.safeContent.substring(0, 120) + '...'}</div>
  <div className="blog-item-footer">
    <ul className="blog-section">
      <li>
        <NavLink to={`/articles/${blog.rootSectionId}`}>{blog.rootSectionName}</NavLink>
      </li>
      <li>
        <NavLink to={`/articles/${blog.rootSectionId}/${blog.secondSectionId}`}>&gt;{blog.secondSectionName}</NavLink>
      </li>
    </ul>
    <a href="#">posted {blog.createdDate}</a>
    <a href="#">阅读 ({blog.viewCount})</a>
    <a href="#">评论 ({blog.commentCount})</a>
    <a href="#">编辑</a>
  </div>
</div>)

export default BlogItem
