import request from '../../utils/request'

export const REQUEST_NAVS = 'REQUEST_NAVS'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'

export const receiveArticles = (page) => ({
    type: RECEIVE_ARTICLE,
    page
})

export const fetchArticles = filters => dispatch => {
    return request.get('/api/v1/articles', filters)
        .then(result => {
            result.data.loadedAll = result.data.totalPages <= result.data.page
            result.data.params = filters
            dispatch(receiveArticles(result.data))
        })
        .catch(e => console.log(e))
}