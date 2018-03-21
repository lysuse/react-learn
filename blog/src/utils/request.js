import { message } from 'antd'

// 封装请求返回的一些公共处理
function Fetch(url, type, params) {

  let formData = new FormData()

  let reqBody = {}

  if (params && typeof params === 'object') {
    for(let key in params) {
      formData.append(key, params[key])
    }
    reqBody = formData
  }

  if (params && typeof params === 'string') {
    reqBody = params
  }

  const defer = new Promise((resolve, reject) => {
    fetch(url, {
      method: type,
      body: reqBody
    }).then(response => {
        return response.json()
    }).then(data => {
        //返回成功数据
        if (data.code === 0) {
          resolve(data)
        } if (data.code === 401 || data.code === 10401 || data.code === 10407) {
          message.error('你还没有登录，请登录后再操作！')
          window.location.href = window.location.origin + '/login?returnUrl='+window.location.href
        } else {
          reject(data)
        }
    }).catch(error => {
        //捕获异常
        console.log(error.msg)
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
