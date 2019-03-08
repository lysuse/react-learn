import React from 'react'
import BlogItem from '../blog-item'
import Pager from '../pager'
import loadingSvg from '@/assets/images/loading.svg'
import './blog_list.scss'
const BlogList = props => (
  <div className="blog-list">
    <h2>
      {props.title}
    </h2>
    {props.datas.map((blog, index) => <BlogItem blog={blog} key={blog.id} />)}
    {props.loading && <div className="loading-spin"><img width="32" src={loadingSvg} alt=""/>加载中...</div>}
    {props.total <= 0 && !props.loading && <div className="no-data">暂无相关文章</div> }
    <Pager page={props.page} pageSize={props.pageSize} total={props.total} onChange={props.loadPage} />
  </div>
)
export default BlogList
