import React, { useState } from 'react';
import './index.scss';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange
  }
}

const CommentForm = (props) => {
  const usernameInput = useFormInput('')
  const concatInput = useFormInput('')
  const contentInput = useFormInput('')
  const captchaInput = useFormInput('')
  const [errorMsg, setErrorMsg] = useState('')
  const [captcha, setCaptcha] = useState(`/api/v1/captcha/image?_t=${new Date().getTime()}`)
  const postComment = () => {
    if (!usernameInput.value || !/^\S{2,10}/.test(usernameInput.value)) {
      setErrorMsg('昵称格式不正确, 2~10个字符')
      return;
    }
    if (!concatInput.value 
        || (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(concatInput.value) 
            && !/\d{5,13}/ 
            && !/\w+/.test(concatInput.value))) {
      setErrorMsg('联系方式只能为微信，qq，邮箱')
      return;
    }
    if (!contentInput.value || !/^\S+$/.test(contentInput.value)) {
      setErrorMsg('内容不能为空')
      return;
    }
    if (!captchaInput.value || !/^\w{4}$/.test(captchaInput.value)) {
      setErrorMsg('验证码不能为空')
      return;
    }
    setErrorMsg('')
    if (props.onPost) {
      props.onPost({ username: usernameInput.value, contact: concatInput.value, content: contentInput.value, captcha: captchaInput.value})
    }
  }
  return (
    <div className="comment-form">
      <h2>我要留言</h2>
      <div className="comment-form-item">
        <span>昵    称:</span>
        <input type="text" {...usernameInput} name="username" placeholder="请输入昵称" />
      </div>
      <div className="comment-form-item">
        <span>联系方式:</span>
        <input type="text" {...concatInput} name="email" placeholder="qq，微信，邮箱" />
      </div>
      <div className="comment-form-item">
        <span>内   容:</span>
        <textarea name="content" {...contentInput} placeholder="请输入留言内容" cols="80" rows="4"></textarea>
      </div>
      <div className="comment-form-item">
        <span>验 证码:</span>
        <input type="text" {...captchaInput} maxLength="4" minLength="4" name="captcha" placeholder="请输入验证码" />
        <img title="点击刷新" onClick={() => {
          setCaptcha(`/api/v1/captcha/image?_t=${new Date().getTime()}`)
        }} className="captcha-code" src={captcha} alt="验证码" />
      </div>
      <div className="comment-form-msg-tip">{errorMsg}</div>
      <div className="comment-form-item">
        <a className="submit-btn" href="javascript:void(0);" onClick={postComment}>提交</a>
      </div>
    </div>
  );
}

export default CommentForm;