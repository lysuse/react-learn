import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AdminLeft from './components/AdminLeft'
import Profile from './components/Profile'
import MenuManage from './components/MenuManage'
import ArticleManage from './components/ArticleManage'
import DataManage from './components/DataManage'
import './admin.scss'

const Admin = props => {
  const { tabName } = props.match.params
  const { config, user } = props 
  const AdminCotents = {
    profile: Profile,
    menuManage: MenuManage,
    articleManage: ArticleManage
  }
  const AdminContentPan = AdminCotents[tabName] || DataManage
  const manageProps = {
    tagManage: {
      tableName: '标签',
      createUrl: '/api/v1/tags',
      editUrl: '/api/v1/tags',
      deleteUrl: '/api/v1/tags',
      dataUrl: '/api/v1/tags',
      columns: [
        { key: "name", dataIndex: "name", title: "名称", sorter: true, editType: "input" },
        { key: "remark", dataIndex: "remark", title: "备注", editType: "textarea" }
      ]
    },
    bannerManage: {
      tableName: 'banner',
      createUrl: '/api/v1/banners',
      editUrl: '/api/v1/banners',
      deleteUrl: '/api/v1/banners',
      dataUrl: '/api/v1/banners',
      columns: [
        { key: "title", dataIndex: "title", sorter: true, title: "标题", editType: "input" },
        { key: "rank", dataIndex: "rank", sorter: true, title: "排序", editType: "number" },
        { key: "imageUrl", dataIndex: "imageUrl", title: "图片地址", editType: "input", render: (text, banner) => (<a title={text} target="_blank" href={text}>{banner.title}</a>) },
        { key: "targetUrl", dataIndex: "targetUrl", title: "跳转地址", editType: "input" },
        { key: "newPage", dataIndex: "newPage", title: "打开新页面", editType: "switch", render: (text, banner) => (<span>{text?'是':'否'}</span>) }
      ]
    },
    dayQuote: {
      tableName: '名言',
      createUrl: '/api/v1/quotes',
      editUrl: '/api/v1/quotes',
      deleteUrl: '/api/v1/quotes',
      dataUrl: '/api/v1/quotes',
      columns: [
        { key: "content", dataIndex: "content", title: "名言内容", editType: "textarea" },
        { key: "author", dataIndex: "author", title: "作者", editType: "input" }
      ]
    }
  }
  const panelProps = manageProps[tabName] || {}
  if (!user.logged) {
    return (
      <Redirect
        to={{
          pathname: `/login?returnUrl=${encodeURIComponent(props.location.pathname)}`
        }}
      />
    )
  }
  return (
    <div className="admin-body">
      <AdminLeft menuCodes={config.menuCodes} menus={config.menus} tabName={tabName} />
      <div className="right-content">
        <AdminContentPan user={user} {...panelProps} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { user, config } = state
  return {
    user,
    config
  }
}

export default connect(mapStateToProps)(Admin)