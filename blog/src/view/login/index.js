import React, {Component} from 'react'
import {connect} from 'react-redux'
import http from '@/utils/request'
import './login.scss'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      captchaUrl: `/api/v1/captcha/image`,
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      }
    }
  }
  updateCaptcha() {
    this.setState({captchaUrl: `/api/v1/captcha/image?_t=${new Date().getTime()}`})
  }
  doLogin(e) {
    e.preventDefault()
    http.post('/api/v1/login', {
      username: this.state.loginForm.username,
      password: this.state.loginForm.password,
      captcha: this.state.loginForm.captcha
    })
  }
  render() {
    return (<div className="login-form">
      <form action="/api/v1/login" method="post" onSubmit={(e) => {
          this.doLogin(e)
        }}>
        <h2>管理登录</h2>
        <div className="form-item pt30">
          <input required="required" maxLength="50" type="text" data-name="username" name="username" placeholder="用户名"/>
        </div>
        <div className="form-item">
          <input required="required" minLength="6" maxLength="16" type="password" data-name="password" name="password" placeholder="密码"/>
        </div>
        <div className="form-item">
          <input required="required" minLength="4" maxLength="4" type="text" data-name="captcha" name="captcha" placeholder="验证码"/>
          <img title="点击刷新" onClick={() => {
              this.updateCaptcha()
            }} className="captcha-code" src={this.state.captchaUrl} alt="验证码"/>
        </div>
        <div className="form-item">
          <button className="btn-login" type="submit">登 录</button>
          <button className="btn-reset" type="reset">重 置</button>
        </div>
      </form>
    </div>)
  }
}

const mapStateToProps = state => {
  const {user} = state
  return {user}
}

export default connect(mapStateToProps)(Login)
