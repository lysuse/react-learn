import { useState, useEffect } from 'react';
import http from '@/utils/request'
import { message } from 'antd';

export const useTableModel = ({ dataUrl, createUrl, editUrl, deleteUrl, tableName}) => {
  // 分页数据
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('createdDate')
  const [order, setOrder] = useState('desc')
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  // 编辑业务模板
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const saveCreateData = () => {
    if (!editData || Object.keys(editData).length <= 0) {
      message.warning('请输入正确的表单数据')
      return
    }
    return http.post(createUrl, editData).then(res => {
      setEditData({})
      setShowModal(false)
      message.success('保存成功！')
      setPage(page > 1 ? (page - 1) : 1)
    }).catch(e => {
      message.error(e.message)
    })
  }
  
  const saveEditData = () => {
    if (!editData || Object.keys(editData).length <= 1) {
      message.warning('请输入正确的表单数据')
      return
    }
    return http.post(editUrl, editData).then(res => {
      setEditData({})
      setShowModal(false)
      message.success('修改成功！')
      setPage(page > 1 ? (page - 1) : 1)
    }).catch(e => {
      message.error(e.message)
    })
  }

  const saveData = () => {
    if (editData && editData.id) {
      saveEditData()
    } else {
      saveCreateData()
    }
  }
  const deleteData = (id) => {
    return http.deleted(`${deleteUrl}/${id}`, {id}).then(res => {
      message.success('删除成功！')
      setPage(page > 1 ? (page - 1) : 1)
    }).catch(e => {
      message.error(e.message)
    })
  }

  // 新建数据
  const newData = () => {
    setEditData({})
    setShowModal(true)
    setModalTitle(`新建${tableName}`)
  }
  // 编辑数据
  const editingData = (data) => {
    setEditData(data)
    setShowModal(true)
    setModalTitle(`修改${tableName}`)
  }

  const hideModal = () => {
    setShowModal(false)
  }

  const onChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination
    const { sortField, sortOrder } = sorter
    setPage(current)
    setSort(sortField)
    setPageSize(pageSize)
    setOrder(sortOrder === 'ascend' ? 'asc' : 'desc')
  }

  const onEditDataChange = (e) => {
    const data = Object.assign({}, editData, { [e.target.name]: e.target.value})
    setEditData(data)
  }

  useEffect(() => {
    setLoading(true)
    http.get(dataUrl, {page, pageSize, sort, order}).then(res => {
      if (res.data instanceof Array) {
        setDataSource(res.data)
        setLoading(false)
        setTotal(res.data.length)
      } else {
        setDataSource(res.data.datas)
        setLoading(false)
        setTotal(res.data.total)
      }
    }).catch(e => {
      setLoading(false)
    })
  }, [dataUrl, sort, order, page, pageSize])

  return {
    saveData,
    deleteData,
    editData,
    newData,
    editingData,
    showModal,
    modalTitle,
    hideModal,
    onEditDataChange,
    tablePage: {
      loading,
      pagination: {
        current: page,
        pageSize,
        total
      },
      dataSource,
      onChange,
    }
  }
}