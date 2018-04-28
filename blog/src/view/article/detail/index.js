import React, {Component} from 'react'
import {connect} from 'react-redux'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import {getArticleDetail} from '@/redux/actions'
import './detail.scss'

const siders = [
  {
    pId: 1,
    id: 11,
    name: '标题',
    time: '2018-04-11'
  }, {
    pId: 1,
    id: 12,
    name: '标题2',
    time: '2018-04-10'
  }, {
    pId: 1,
    id: 13,
    name: '标题3',
    time: '2018-04-11'
  }, {
    pId: 1,
    id: 14,
    name: '标题4',
    time: '2018-04-11'
  }
]

class ArticleDetail extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getArticleDetail(this.props.match.params.id))
  }
  render() {
    const sider = (<SectionSider title='热门文章' sections={siders}/>)
    const tags = (this.props.detail.tags || []).map(tag => <a href="#">{tag.name}</a>)
    return (<div>
      <Body className="article-detail-page" sider={sider}>
        <div className="detail-wrapper">
          <div className="article-detail-header">
            <h2>{this.props.detail.title}</h2>
            <div className="article-detail-header-info">
              <div className="article-tags">{tags}</div>
              <div className="article-counts">
                <a href="#">posted {this.props.detail.createdDate}</a>
                <a href="#">阅读 ({this.props.detail.viewCount})</a>
                <a href="#">评论 ({this.props.detail.commentCount})</a>
                <a href="#">编辑</a>
              </div>
            </div>
          </div>
          <div className={`article-detail-content content-${this.props.detail.sourceType}`} dangerouslySetInnerHTML={{
              __html: this.props.detail.content
            }}></div>
        </div>
      </Body>
    </div>)
  }
}

const mapStateToProps = state => {
  const {blog} = state
  return {detail: blog.detail, page: blog.page}
}

export default connect(mapStateToProps)(ArticleDetail)
