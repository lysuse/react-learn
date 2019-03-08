import React from 'react'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import BlogList from '@/components/blog-list'
import { useArticlePage, useSimpleArticlePage } from '@/effects/article'

const ArticleList = props => {
  const sectionMap ={
    lifeNote: {
      title: '生活随笔',
      rightSideTitle: '随笔排行',
      dataParams: {},
      rootSectionId: 6
    },
    technology: {
      title: '技术笔记',
      rightSideTitle: '热门笔记',
      dataParams: {},
      rootSectionId: 7
    }
  }
  const { title, rightSideTitle, rootSectionId } = sectionMap[props.match.params.sectionName] || { title: '技术笔记', rightSideTitle: '热门笔记' }
  const articlePage = useArticlePage({ pageSize: 10, rootSectionId })
  const simples = useSimpleArticlePage({ page: 1, pageSize: 12, sort: 'viewCount', order: 'desc', rootSectionId })
  const sider = (<SectionSider key={`sider_${rootSectionId}`} title={rightSideTitle} sections={simples} />)
  return (
    <Body className="home-page" sider={sider}>
      <BlogList key={props.location.pathname} title={title} {...articlePage}></BlogList>
    </Body>
  )
}

export default ArticleList