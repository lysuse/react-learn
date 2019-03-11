import React, { useState } from 'react'
import { Table, Button, Divider, Form, TreeSelect, Switch, Select, Modal, message, Popconfirm, Row, Col, Input, Icon } from 'antd'
import { useArticlePage, useSearchTags } from '@/effects/article'
import { useSection } from '@/effects/sections'
import marked from 'marked'

const ArticleManage = props => {
  const articlePage = useArticlePage({ pageSize: 10 })
  const { sections } = useSection()
  const [editArticle, setEditArticle] = useState({markdownChecked: true})
  const [showModal, setShowModal] = useState(false)
  const [searchTag, setSeachTag] = useState('')
  const [selectTags, setSelectTags] = useState([])
  const tags = useSearchTags(searchTag)

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
          <a href="javascript:void(0);" onClick={() => editingArticle(article)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title={`你确定要删除该文章吗?`} onConfirm={() => { articlePage.deleteArticle(article.id) }} okText="确定" cancelText="取消">
            <a href="javascript:void(0);" >删除</a>
          </Popconfirm>
        </span>
      )}
  ]
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  const onEditDataChange = (e) => {
    const data = Object.assign({}, editArticle, { [e.target.name]: e.target.value })
    setEditArticle(data)
  }

  const editingArticle = article => {
    const markdownChecked = !article.sourceContent || article.sourceContent.startsWith('[markdown]')
    
    setEditArticle(Object.assign({}, article, { markdownChecked }, 
      { sourceContent: (article.sourceContent && article.sourceContent.startsWith('[markdown]') ? article.sourceContent.substring(10): article.sourceContent)}))
    setShowModal(true)
  }

  const saveArticle = () => {
    const articleParams = Object.assign({}, editArticle, {tags: selectTags})
    if (!articleParams.title) {
      message.error('文章标题不能为空！')
      return
    }
    if (articleParams.title.length > 200) {
      message.error('文章标题不能超过200个字符！')
      return
    }
    if (!articleParams.sourceContent) {
      message.error('文章内容不能为空！')
      return
    }
    if (articleParams.markdownChecked) {
      articleParams.sourceContent = `[markdown]${articleParams.sourceContent}`
    }
    if (!articleParams.section) {
      message.error('请选择所属栏目')
      return
    }
    articleParams.rootSectionId = articleParams.section.pid || ''
    articleParams.secondSectionId = articleParams.section.id || ''
    articleParams.pubUser = props.user.username
    articleParams.createdDate = ''
    articleParams.createdDate = ''
    articlePage.saveArticle(articleParams).then(res => {
      message.success('保存成功')
      setEditArticle({})
      setShowModal(false)
    }).catch(e => {
      message.error(e.message)
    })
  }

  return (
    <div>
      <div className="table-bar">
        <div className="table-bar-left">
        </div>
        <div className="table-bar-right">
          <Button type="primary" onClick={() => setShowModal(true)}>新建</Button>
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
      <Modal
        width={'80%'}
        title={`${editArticle.id ? '编辑' : '添加'}文章`}
        visible={showModal}
        okText="保存"
        cancelText="取消"
        onOk={saveArticle}
        onCancel={() => setShowModal(false)}>
        <Form.Item
          {...layout}
          key={'title'}
          label={'标题'}>
          <Input placeholder={'请输入标题'} name='title' value={editArticle.title} onChange={onEditDataChange} />
        </Form.Item>
        <Form.Item
          {...layout}
          key={'section'}
          label={'所属栏目'}>
          <TreeSelect
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={sections}
            treeNodeLabelProp='name'
            placeholder="请选择"
            treeDefaultExpandAll
            onSelect={(value, node, extra) => { onEditDataChange({ target: { name: 'section', value: {id: value, pid: node.props.pid} } })}}
          />
        </Form.Item>
        <Form.Item
          {...layout}
          key={'sourceType'}
          label={'是否markdown'}>
          <Switch defaultChecked onChange={(checked) => { onEditDataChange({ target: { value: checked, name: 'markdownChecked'}})}} />
        </Form.Item>
        <Form.Item
          {...layout}
          key={'tags'}
          label={'标签列表'}>
          <Select
            showSearch
            mode={'multiple'}
            placeholder={'请选择标签'}
            style={{width: '300px'}}
            defaultActiveFirstOption={false}
            showArrow={false}
            onChange={v => setSelectTags(v)}
            tokenSeparators={','}
            notFoundContent={null}
          >
            {tags.map(d => (<Select.Option key={d.id} title={d.name}>{d.name}</Select.Option>))}
          </Select>
        </Form.Item>
        <Form.Item
          {...layout}
          wrapperCol={{ span: 18 }}
          key={'sourceContent'}
          label={'文章内容'}>
          <Row type="flex">
            <Col span={12} order={1}>
              <Input.TextArea rows={15} placeholder={'请输入文章内容'} name={'sourceContent'} value={editArticle.sourceContent} onChange={onEditDataChange} />
            </Col>
            <Col span={12} order={2}>
              {(editArticle.markdownChecked || (editArticle.sourceContent && editArticle.sourceContent.startsWith('[markdown]'))) && <div style={{ marginLeft: '20px', padding: '5px', minHeight: '300px', border: '#eee 1px solid', borderRadius: '5px' }} className={`article-detail-content markdown-body content-markdown`} dangerouslySetInnerHTML={{
                __html: marked(editArticle.sourceContent || '')
              }}></div>}
            </Col>
          </Row>
        </Form.Item>

      </Modal>
    </div>
  )
}

export default ArticleManage
