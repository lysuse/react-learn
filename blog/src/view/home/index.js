import React from 'react'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import BlogList from '@/components/blog-list'
import BlogBanner from '@/components/banner'
import { useArticlePage, useSimpleArticlePage, useQuote } from '@/effects/article'
import { useBanner } from '@/effects/banner'
import './home.scss'

const Home = () => {
  const articlePage = useArticlePage({pageSize: 10})
  const simples = useSimpleArticlePage({ page: 1, pageSize: 12, sort: 'viewCount', order: 'desc' })
  const banners = useBanner()
  const quote = useQuote()
  const sider = (<SectionSider key={'home_sider'} title='热门文章' sections={simples} />)
  return (
    <div>
      <BlogBanner banners={banners} quote={quote} />
      <Body className="home-page" sider={sider}>
        <BlogList title='最新文章' {...articlePage}></BlogList>
      </Body>
    </div>
  )
}

export default Home