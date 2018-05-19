import React from 'react'
import BlogItem from '../blog-item'
import Pager from '../pager'
import './blog_list.scss'
const BlogList = ({ title, page, onPageChange }) => (
  <div className="blog-list">
    <h2>
      {title}
    </h2>
    {page.datas.map((blog, index) => <BlogItem blog={blog} key={blog.id} />)}
    {page.loading ? <div >加载中...</div>: null}
    <Pager page={page.page} pageSize={page.pageSize} total={page.total} onChange={(page, pageSize)=>{onPageChange(page, pageSize)}} />
  </div>
)
export default BlogList
