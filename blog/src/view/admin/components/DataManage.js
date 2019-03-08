import React from 'react'
import { Table, Button, Modal, Switch, Divider, Form, Input, Popconfirm } from 'antd'
import { useTableModel } from '@/effects/data'

const DataManage = props => {
  const { saveData, deleteData, newData, editData, onEditDataChange, editingData, showModal, hideModal, modalTitle, tablePage } = useTableModel(props)
  const columns = [{ key: "id", dataIndex: "id", title: "编号" }]
      .concat(props.columns || [])
      .concat(
        [
          {
            title: '时间',
            key: 'date',
            render: (text, data) => (
              <span>{data.createdDate} | {data.modifiedDate}</span>
            )
          },
          {
            title: '操作',
            key: 'action',
            render: (text, data) => (
              <span>
                <a href="javascript:void(0);" onClick={() => {
                  editingData(data)
                }}>编辑</a>
                <Divider type="vertical" />
                <Popconfirm title={`你确定要删除该${props.tableName}吗?`} onConfirm={() => { deleteData(data.id)}} okText="确定" cancelText="取消">
                  <a href="javascript:void(0);" >删除</a>
                </Popconfirm>
              </span>
            )
          }
        ])
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }
  return (
    <div>
      <div className="table-bar">
        <div className="table-bar-left">
        </div>
        <div className="table-bar-right">
          <Button type="primary" onClick={newData}>新建</Button>
        </div>
      </div>
      <Table
        sorter={true}
        columns={columns}
        {...tablePage}
      />
      <Modal
        title={modalTitle}
        visible={showModal}
        okText="保存"
        cancelText="取消"
        onOk={saveData}
        onCancel={hideModal}>
        {props.columns.map( column => (
          <Form.Item
            {...layout}
            key={column.key}
            label={column.title}>
            {column.editType === 'input' && <Input placeholder={'请输入' + column.title} name={column.key} value={editData[column.key]} onChange={onEditDataChange} />}
            {column.editType === 'number' && <Input placeholder={'请输入' + column.title} type='number' name={column.key} value={editData[column.key]} onChange={onEditDataChange} />}
            {column.editType === 'textarea' && <Input.TextArea placeholder={'请输入' + column.title} name={column.key} value={editData[column.key]} onChange={onEditDataChange} />}
            {column.editType === 'switch' && <Switch name={column.key} checked={editData[column.key]} onChange={(checked, e) => {onEditDataChange({target: {name: column.key, value:checked}})}} />}
          </Form.Item>
        ))}
      </Modal>
    </div>
  )
}

export default DataManage