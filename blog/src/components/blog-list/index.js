import React from 'react'
import BlogItem from './blog-item'
import { Pagination } from 'antd'

export default const BlogList = ({ page, onPageChange }) => (
  <div className="blog-list">
    {page.datas.map((blog, index) => <BlogItem blog={blog} key={blog.id} />)}
    <Pagination simple defaultCurrent={page.page} onChange={(page, pageSize)=>{onPageChange(page, pageSize)}} total={page.total} />
  </div>
)
