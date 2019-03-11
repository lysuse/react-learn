import React, { useState } from 'react'
import { useSection } from '@/effects/sections'
import { Table, Button, Divider, Modal, Input, message, Form, Popconfirm } from 'antd'
const MenuManage = props => {
  const [showModal, setShowModal] = useState(false)
  const [editSection, setEditSection] = useState({})
  const { sections, deleteSection, saveSection } = useSection(editSection)
  
  const startNewSectionFromPid = pId => {
    setEditSection({ pId})
    setShowModal(true)
  }

  const columns = [
    { key: "id", dataIndex: "id", title: "编号" },
    { key: "name", dataIndex: "name", title: "名称" },
    { key: "remark", dataIndex: "remark", title: "备注" },
    { key: "createdDate", dataIndex: "createdDate", title: "创建时间" },
    { key: "action", dataIndex: "action", title: "操作", render: (text, row) => (
      <span>
        <a href="javascript:;" onClick={() => { setShowModal(true); setEditSection(row) }}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title="你确定要删除该栏目吗?" onConfirm={() => { deleteSection(row.id)}} onCancel={() => {}} okText="确定" cancelText="取消">
          <a href="javascript:void(0);">删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a href="javascript:void(0);" onClick={() => { startNewSectionFromPid(row.id) }}>新建</a>
      </span>
      )
    }
  ]

  const handleChangeInput = e => {
    const newEditSection = Object.assign({}, editSection, {[e.target.name]: e.target.value})
    setEditSection(newEditSection)
  }
  const doSaveSection = () => {
    if (!editSection.name) {
      message.error('栏目名称不能为空！')
      return
    }
    if (editSection.name.length > 50) {
      message.error('栏目名称不能超过50个字符！')
      return
    }
    editSection.createdDate = ''
    editSection.modifiedDate = ''
    saveSection(editSection).then(res => {
      message.success('保存成功')
      setEditSection({})
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
        rowKey={section => section.id}
        size="middle"
        dataSource={sections}
      />
      <Modal
        title={editSection.id ? '编辑栏目' : '新增栏目'}
        visible={showModal}
        onOk={doSaveSection}
        okText="保存"
        cancelText="取消"
        onCancel={() => {setShowModal(false)}}
        >
        <Form.Item>
          <Input placeholder="名称" name='name' value={editSection.name} onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="备注" name='remark' value={editSection.remark} onChange={handleChangeInput} />
        </Form.Item>
      </Modal>
    </div>
  )
}

export default MenuManage
