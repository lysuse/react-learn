import { useState, useEffect } from 'react';
import http from '@/utils/request'
import { _processArticleContent } from '@/redux/actions';

export const useArticlePage = ({ sort = 'createdDate', order = 'desc', q = '', tagId = '', pageSize = 10, rootSectionId = '', secondSectionId = '' }) => {
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [datas, setDatas] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [reload, setRelaod] = useState(false)
  // 加载分页文章信息
  useEffect(() => {
    setLoading(true)
    http.get(`/api/v1/articles`, { sort, order, q, tagId, pageSize, page , rootSectionId, secondSectionId})
    .then(res => {
      setDatas(res.data.datas.map(data => _processArticleContent(data)))
      setPage(res.data.page)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
    })
  }, [sort, order, q, tagId, pageSize, page, rootSectionId, reload, secondSectionId])

  const deleteArticle = id => {
    return http.deleted(`/api/v1/articles/${id}`).then(res => {
      setRelaod(!reload)
      return res
    })
  }

  const saveArticle = article => {
    return http.post(`/api/v1/articles`, article).then(res => {
      setRelaod(!reload)
      return res
    })
  }
  // 返回相关信息
  return {
    page,
    pageSize,
    total,
    totalPages,
    datas,
    loading,
    loadPage: setPage,
    deleteArticle,
    saveArticle
  }
}

export const useSimpleArticlePage = ({ sort = 'createdDate', order = 'desc', q = '', tagId = '', page =1, pageSize = 10, rootSectionId = '', secondSectionId = '' }) => {
  const [simpleArticles, setSimpleArticles] = useState([])
  useEffect(() => {
    http.get(`/api/v1/articles/simples`, { sort, order, q, tagId, pageSize, page, rootSectionId, secondSectionId }).then(res => {
      setSimpleArticles(res.data.datas.map(data => _processArticleContent(data)))
    })
  }, [ sort, order, q, tagId, pageSize, page, rootSectionId, secondSectionId ])
  return simpleArticles
}

export const useArticleDetail = id => {
  const [article, setArticle] = useState({})
  useEffect(() => {
    http.get(`/api/v1/articles/${id}`).then(res => {
      setArticle(_processArticleContent(res.data))
    })
  }, id)
  return article
}

export const useArticleComments = articleId => {
  const [comments, setComments] = useState({})
  const [loadedAll, setLoadedAll] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    if (loadedAll) return
    http.get(`/api/v1/articles/${articleId}/comments`).then(res => {
      if (page === 1) {
        setComments(res.data.datas)
      } else {
        setComments([...comments, ...res.data.datas])
      }
      if (res.data.page >= res.data.totalPages) {
        setLoadedAll(true)
      }
      setTotal(res.data.total)
    })
  }, [page, articleId, reload])

  const postComment = params => {
    return http.post(`/api/v1/articles/${params.articleId}/comment`, params).then(res => {
      setReload(true)
      return res
    })
  }

  const loadMore = () => {
    if (loadedAll) {
      setPage(page + 1)
    }
  }

  return {
    loadedAll,
    setPage,
    total,
    comments,
    postComment,
    loadMore
  }
}

export const useQuote = () => {
  const [quote, setQuote] = useState({})
  useEffect(() => {
    http.get(`/api/v1/quotes/today`).then(res => {
      setQuote(res.data || {})
    })
  }, quote)
  return quote
}

export const useSearchTags = q => {
  const [result, setResult] = useState([])
  useEffect(() => {
    http.get(`/api/v1/tags/search`, {q}).then(res => {
     setResult(res.data) 
    })
  }, [q])
  return result
}