import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '@/components/body'
import SectionSider from '@/components/section-sider'
import BlogList from '@/components/blog-list'
import BlogBanner from '@/components/banner'
import { fetchArticles } from '@/redux/actions'
import './home.scss'
const siders = [
  {
    pId: 1,
    id: 11,
    name: '标题',
    time: '2018-04-11'
  },
  {
    pId: 1,
    id: 12,
    name: '标题2',
    time: '2018-04-10'
  },
  {
    pId: 1,
    id: 13,
    name: '标题3',
    time: '2018-04-11'
  },
  {
    pId: 1,
    id: 14,
    name: '标题4',
    time: '2018-04-11'
  }
]
class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchArticles({pageSize: 10}))
  }
  render() {
    const sider = (<SectionSider title='热门文章' sections={siders}/>)
    return (
      <div>
        <BlogBanner></BlogBanner>
        <Body className="home-page" sider={sider}>
          <BlogList title='最新文章' page={this.props.blog.page}></BlogList>
        </Body>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { blog } = state
  return {
    blog
  }
}

export default connect(mapStateToProps)(Home)
