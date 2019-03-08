import React, { useState, useEffect } from 'react'
import http from '@/utils/request'
import { Table, Button, Divider, Icon } from 'antd'
import { useArticlePage } from '@/effects/article'

const ArticleManage = props => {

  const [datas, setDatas] = useState([])
  const articlePage = useArticlePage({ pageSize: 10 })
  const columns = [
    { key: "id", dataIndex: "id", title: "编号" },
    { key: "title", dataIndex: "title", title: "标题", render: (text, article) => (
        <span title={text}>{text.length > 20 ? text.substring(0, 20) : text}</span>
      )
    },
    {
      key: "sections", dataIndex: "sections", title: "栏目", render: (text, article) => (
        <span>
          <a href="javascript:void(0);">{article.rootSectionName}>{article.secondSectionName}</a>
        </span>
      )
    },
    { key: "pubUser", dataIndex: "pubUser", title: "发布人" },
    { key: "counts", dataIndex: "counts", title: "数量统计", render: (text, article) => (
        <span style={{fontSize: '12px'}}>
          <Icon type="eye" title="浏览数" theme="filled" />({article.viewCount})
          <Icon type="message" title="评论数" theme="filled" />({article.commentCount})
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text, article) => (
        <span>
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      )}
  ]
  
  return (
    <div>
      <div className="table-bar">
        <div className="table-bar-left">
        </div>
        <div className="table-bar-right">
          <Button type="primary">新建</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={article => article.id}
        size="middle"
        pagination={{ current: articlePage.page, results: articlePage.pageSize }}
        loading={articlePage.loading}
        expandedRowRender={article => <p style={{ margin: 0, padding: 0 }} dangerouslySetInnerHTML={{ __html: article.content}}>
        </p>}
        dataSource={articlePage.datas}
      />
    </div>
  )
}

export default ArticleManage
