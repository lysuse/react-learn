import React,{ Component } from 'react'
import './pager.scss'
export default class Pager extends Component {
  getPages() {
    const pageArray = []
    const totalPage = Math.ceil((this.props.total || 1) / (this.props.pageSize || 1))
    const start = this.props.page - 2 <= 0 ? 1 : this.props.page - 2
    const end  = this.props.page + 2 > totalPage ? totalPage : this.props.page + 2
    for (let i = start; i < end + 1; i++) {
      pageArray.push(i)
    }
    if (start === end && start !== 1) {
      pageArray.push(this.props.page)
    }
    return pageArray
  }
  render() {
    // 总页数
    const totalPage = Math.ceil((this.props.total || 1) / (this.props.pageSize || 1))
    const pages = this.getPages()
    const showPrev = totalPage > 1 && this.props.page > 1
    const showNext = totalPage > 1 && totalPage > this.props.page
    if (totalPage <= 1) return null
    return (
      <ul className="pager">
        {showPrev && <li className="pager-prev"><a href="javascript:void(0);" onClick={() => { this.props.onChange(this.props.page - 1, this.props.pageSize) }}>Prev</a></li>}
        {pages.map((page, index) => (
          <li key={'pager_'+index} className={this.props.page === page ? 'active' : ''} onClick={() => {this.props.onChange(page, this.props.pageSize)}}>
            <a href="javascript:void(0);">{page}</a>
          </li>
        ))}
        {showNext && <li className="pager-next"><a href="javascript:void(0);" onClick={() => { this.props.onChange(this.props.page + 1, this.props.pageSize) }}>Next</a></li>}
      </ul>
    )
  }
}
