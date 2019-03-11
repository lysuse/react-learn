import React from 'react'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import BlogList from '@/components/blog-list'
import { useArticlePage, useSimpleArticlePage } from '@/effects/article'
import { useSection } from '@/effects/sections';

const ArticleList = props => {

  const { sections } = useSection()

  const rootSection = sections.find(s => `${s.id}` === props.match.params.rid)
  let secondSection = null
  if (rootSection && props.match.params.sid) {
    secondSection = rootSection.children.find(s => `${s.id}` === props.match.params.sid)
  }

  const articlePage = useArticlePage({ pageSize: 10, rootSectionId: (rootSection ? rootSection.id : ''), secondSectionId: (secondSection ?secondSection.id : '') })
  const simples = useSimpleArticlePage({ page: 1, pageSize: 12, sort: 'viewCount', order: 'desc', rootSectionId: (rootSection ? rootSection.id : ''), secondSectionId: (secondSection ? secondSection.id : '') })
  const sider = (<SectionSider key={`sider_${rootSection ? rootSection.id : 'all'}`} title={'相关文章'} sections={simples} />)
  const title = (secondSection ? secondSection.title : '') || (rootSection ? rootSection.title : '')
  return (
    <Body className="home-page" sider={sider}>
      <BlogList key={props.location.pathname} title={title} {...articlePage}></BlogList>
    </Body>
  )
}

export default ArticleList