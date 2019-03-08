import React, { useState } from 'react'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import CommentForm from '@/components/comment-form'
import CommentList from '@/components/comment-list'
import { useArticleComments, useArticleDetail, useSimpleArticlePage } from '@/effects/article'
import './detail.scss'

const ArticleDetail = props => {

  const { total, loadedAll, comments, setPage } = useArticleComments(props.match.params.id)
  const article = useArticleDetail(props.match.params.id)
  const simples = useSimpleArticlePage({ page: 1, pageSize: 12, sort: 'viewCount', order: 'desc'})

  const sider = (<SectionSider key={`detail_${props.match.params.id}`} title='热门文章' sections={simples} />)
  const tags = ([]).map(tag => <a key={'tag_a_' + tag.id} href="#">{tag.name}</a>)

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
        <CommentForm />
        {total > 0 && <CommentList comments={comments} total={total} loadMoreComment={load} loadedAll={loadedAll} />}
      </Body>
    </div>
  )
}

export default ArticleDetail