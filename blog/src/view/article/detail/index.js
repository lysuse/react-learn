import React from 'react'
import { message } from 'antd'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import CommentForm from '@/components/comment-form'
import CommentList from '@/components/comment-list'
import { useArticleComments, useArticleDetail, useSimpleArticlePage } from '@/effects/article'
import './detail.scss'

const ArticleDetail = props => {

  const { total, loadedAll, comments, loadMore, postComment, setPage } = useArticleComments(props.match.params.id)
  const article = useArticleDetail(props.match.params.id)
  const simples = useSimpleArticlePage({ page: 1, pageSize: 12, sort: 'viewCount', order: 'desc'})
  const doPostComment = params => {
    return postComment(Object.assign({}, params, {articleId: article.id})).then(res => {
      message.success('评论成功')
      return res
    }).catch(e => {
      message.error(e.message)
    })
  }

  const sider = (<SectionSider key={`detail_${props.match.params.id}`} title='热门文章' sections={simples} />)
  const tags = (article.tags || []).map(tag => <a style={{marginRight: '10px'}} key={'tag_a_' + tag.id} href="#">{tag.name}</a>)

  return (
    <div>
      <Body className="article-detail-page" sider={sider}>
        <div className="detail-wrapper">
          <div className="article-detail-header">
            <h2>{article.title}</h2>
            <div className="article-detail-header-info">
              <div className="article-tags">{tags}</div>
              <div className="article-counts">
                <a href="#">posted {article.createdDate}</a>
                <a href="#">阅读 ({article.viewCount})</a>
                <a href="#">评论 ({article.commentCount})</a>
                <a href="#">编辑</a>
              </div>
            </div>
          </div>
          <div className={`article-detail-content content-${article.sourceType || 'text'}`} dangerouslySetInnerHTML={{
            __html: article.content
          }}></div>
        </div>
        <CommentForm onPost={doPostComment}/>
        {total > 0 && <CommentList comments={comments} total={total} loadMoreComment={loadMore} loadedAll={loadedAll} />}
      </Body>
    </div>
  )
}

export default ArticleDetail