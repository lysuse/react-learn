import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Icon, Form } from 'antd'
import http from '@/utils/request'

const Profile = props => {
  const [showModal, setShowModal] = useState(false)
  const logout = () => {
    
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
      <button className="update-btn" style={{marginLeft: '15px'}} onClick={() => {}}>退出登录</button>
      <Modal
        title={'修改密码'}
        okText="确定"
        cancelText="取消"
        visible={showModal}
        onOk={() => { }}
        onCancel={() => { setShowModal(false) }}
      >
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="旧密码" />
        </Form.Item>
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
        </Form.Item>
        <Form.Item>
          <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认新密码" />
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