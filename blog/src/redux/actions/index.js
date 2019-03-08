import request from '../../utils/request'
import marked from 'marked'

export const REQUEST_NAVS = 'REQUEST_NAVS'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const RECEIVE_ARTICLE_DETAIL = 'RECEIVE_ARTICLE_DETAIL'
export const SET_USER_INFO = 'SET_USER_INFO'

export const loadingArticle = () => ({
    type: REQUEST_ARTICLE
})

export const receiveArticles = (page) => ({
    type: RECEIVE_ARTICLE,
    page
})

export const receiveArticleDetail = (detail) => ({
    type: RECEIVE_ARTICLE_DETAIL,
    detail
})

export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  payload: userInfo
})

export const _processArticleContent = (article) => {
  let resultHtml = article.sourceContent || ''
  if (/^\[\w+\]/.test(resultHtml)) {
    const typeIndex = resultHtml.indexOf(']')
    let type = resultHtml.substring(1, typeIndex)
    switch (type) {
      case 'markdown':
        resultHtml = marked(resultHtml.substring(typeIndex + 1))
        break;
      default:
        resultHtml = resultHtml.substring(typeIndex + 1).replace(/\n/g, '<br />')
    }
    article.sourceType = type
  } else {
    resultHtml = resultHtml.replace(/\n/g, '<br />')
  }
  article.safeContent = resultHtml.replace(/<\/?.+?>/g, '').trim()
  article.content = resultHtml
  return article
}

export const fetchArticles = filters => dispatch => {
    dispatch(loadingArticle())
    return request.get('/api/v1/articles', filters)
        .then(result => {
            result.data.loadedAll = result.data.totalPages <= result.data.page
            result.data.params = filters
            result.data.datas = result.data.datas.map(data => _processArticleContent(data))
            result.data.loading = false
            dispatch(receiveArticles(result.data))
        })
        .catch(e => console.log(e))
}

export const getArticleDetail = id => dispatch => {
  return request.get(`/api/v1/articles/${id}`)
      .then(result => {
          console.log(result)
          dispatch(receiveArticleDetail(_processArticleContent(result.data)))
      })
      .catch(e => console.log(e))
}

export const login = ({ username, password, captcha}) => dispatch => {
  return request.post(`/api/v1/login`, { username, password, captcha })
    .then(result => dispatch(getUserInfo()))
}

export const getUserInfo = () => dispatch => {
  return request.get('/api/v1/userInfo').then(res => dispatch(setUserInfo(res.data)))
}
