import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, message, Icon, Form } from 'antd'
import http from '@/utils/request'

const Profile = props => {
  const [showModal, setShowModal] = useState(false)
  const [passwordInfo, setPasswordInfo] = useState({ oldPassword: null, newPassword: null, newPassword2: null})
  const logout = () => {
    http.get('/api/v1/logout').then(e => {
      setTimeout(() => {
        window.location.href = '/'
      }, 1200)
    })
  }

  const updatePwd = () => {
    if (!passwordInfo.oldPassword) {
      message.error('旧密码不能为空！')
      return
    }
    if (!passwordInfo.newPassword) {
      message.error('新密码不能为空！')
      return
    }
    if (!passwordInfo.newPassword2) {
      message.error('确认新密码不能为空！')
      return
    }
    if (passwordInfo.newPassword2 !== passwordInfo.newPassword) {
      message.error('密码与确认新密码不匹配！')
      return
    }
    http.post('/api/v1/updatePwd', passwordInfo).then(e => {
      message.success('修改成功, 请重新登录!')
      setTimeout(() => {
        props.history.push('/login')
      }, 1200)
    }).catch(e => {
      message.error(e.message)
    })
  }

  const handlePwdChange = e => {
    const newPwdInfo = Object.assign({}, passwordInfo, {[e.target.name]: e.target.value})
    setPasswordInfo(newPwdInfo)
  }

  return (
    <div className="profile-panel">
      <div className="profile-item">
        <span>用户名:</span> <p>{props.user.username}</p>
      </div>
      <div className="profile-item">
        <span>邮箱:</span> <p>{props.user.email}</p>
      </div>
      <div className="profile-item">
        <span>上次登录时间:</span> <p>{props.user.lastLoginTime}</p>
      </div>
      <div className="profile-item">
        <span>上次登录IP:</span> <p>{props.lastLoginIp || '暂无'}</p>
      </div>
      <button className="update-btn" onClick={() => { setShowModal(true) }}>修改密码</button>
      <button className="update-btn" style={{ marginLeft: '15px' }} onClick={logout}>退出登录</button>
      <Modal
        title={'修改密码'}
        okText="确定"
        cancelText="取消"
        visible={showModal}
        onOk={updatePwd}
        onCancel={() => { setShowModal(false) }}
      >
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} name='oldPassword' onChange={handlePwdChange} type="password" placeholder="旧密码" />
        </Form.Item>
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} name='newPassword' onChange={handlePwdChange} type="password" placeholder="新密码" />
        </Form.Item>
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} name='newPassword2' onChange={handlePwdChange} type="password" placeholder="确认新密码" />
        </Form.Item>
      </Modal>
    </div>
  )
}


const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(Profile)