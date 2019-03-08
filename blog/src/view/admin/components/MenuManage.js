import React, { useState } from 'react'
import { useSection } from '@/effects/sections';
import { Table, Button, Divider, Modal, Input, Icon, Form, Popconfirm } from 'antd'
const MenuManage = props => {
  const sections = useSection()
  const [showModal, setShowModal] = useState(false)
  const [editSection, setEditSection] = useState({})

  const columns = [
    { key: "id", dataIndex: "id", title: "编号" },
    { key: "name", dataIndex: "name", title: "名称" },
    { key: "remark", dataIndex: "remark", title: "备注" },
    { key: "createdDate", dataIndex: "createdDate", title: "创建时间" },
    { key: "action", dataIndex: "action", title: "操作", render: (text, row) => (
      <span>
        <a href="javascript:;" onClick={() => { setShowModal(true); setEditSection(row) }}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title="你确定要删除该栏目吗?" onConfirm={() => {}} onCancel={() => {}} okText="确定" cancelText="取消">
          <a href="javascript:void(0);" >删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a href="javascript:void(0);" onClick={() => {setShowModal(true); editSection.pid = row.id; setEditSection(editSection);}}>新建</a>
      </span>
      )
    }
  ]

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
        onOk={() => {}}
        onCancel={() => {setShowModal(false)}}
        >
        <Form.Item>
          <Input placeholder="名称" value={editSection.name} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="备注" value={editSection.remark} />
        </Form.Item>
      </Modal>
    </div>
  )
}

export default MenuManage
