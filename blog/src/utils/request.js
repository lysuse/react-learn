import {
  message
} from 'antd'

// 封装请求返回的一些公共处理
const Fetch = (url, type, params) => {

  let formData = new FormData()

  let reqBody = ''

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  if (params && typeof params === 'object') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    let urlParams = '?'
    for (let key in params) {
      if (type === 'GET' || type === 'HEAD') {
        urlParams += `${key}=${params[key]}&`
      } else {
        reqBody += `${key}=${params[key]}&`
      }
    }
    urlParams = urlParams.slice(0, -1)
    reqBody = reqBody.slice(0, -1)
    if (type === 'GET' || type === 'HEAD') {
      url += urlParams
    }
  }
  
  if (params && typeof params === 'string') {
    if (type === 'GET' || type === 'HEAD') {
      url += params
    }
  }

  const defer = new Promise((resolve, reject) => {
    fetch(url, {
      method: type,
      headers,
      body: (type === 'GET' || type === 'HEAD') ? null : reqBody
    }).then(response => {
      return response.json()
    }).then(data => {
      //返回成功数据
      if (data.code === 0) {
        resolve(data)
      }
      if ((data.code === 401 || data.code === 10401 || data.code === 10407) && window.location.pathname.indexOf('login') < 0 && url.indexOf('/api/v1/login') < 0 && url.indexOf('/api/v1/userInfo') < 0) {
        message.error('你还没有登录，请登录后再操作！')
        setTimeout(() => {
          window.location.href = window.location.origin + '/login?returnUrl=' + encodeURIComponent(window.location.href.substring(window.location.origin.length))
        }, 2000)
      } else {
        data.message = data.msg || ''
        reject(data)
      }
    }).catch(error => {
      //捕获异常
      console.error(error)
      console.log(error.message)
      reject()
    })
  })

  return defer
}

const Request = {
  get: (url, params) => Fetch(url, 'GET', params),
  post: (url, params) => Fetch(url, 'POST', params),
  deleted: (url, params) => Fetch(url, 'DELETE', params)
}

export default Request