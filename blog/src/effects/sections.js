import { useState, useEffect } from 'react';
import http from '@/utils/request'

export const useSection = () => {
  const [sections, setSections] = useState([])
  const [reload, setRelaod] = useState(false)
  const getChildrenNodes = (datas = [], pid) => {
    const childrens = datas.filter(s => s.pid === pid)
    for (let index = 0; childrens.length > 0 && index < childrens.length; index++) {
      const item = childrens[index]
      item.key = item.id
      item.value = `${item.id}`
      item.title = item.name
      item.children = getChildrenNodes(datas, item.id)
      item.path = '/articles/' + (item.pid ? `${item.pid}/` : '') + `${item.id}`
    }
    return childrens
  }
  useEffect(() => {
    const sectionsText = localStorage.getItem('SECTIONS')
    let sections = null
    if (sectionsText && (sections = JSON.parse(sectionsText)) !== null) {
      if (new Date().getTime() - sections.timestamp < 10 * 3600 * 1000) {
        setSections(sections.sections)
        return
      }
    }
    http.get('/api/v1/article-sections').then(res => {
      const sections = getChildrenNodes(res.data, null)
      localStorage.setItem('SECTIONS', JSON.stringify({ sections, timestamp: new Date().getTime()}))
      setSections(sections)
    })
  }, [reload])
  
  const saveSection = section => {
    return http.post('/api/v1/article-sections', section).then( res => {
      localStorage.removeItem('SECTIONS')
      setRelaod(!reload)
      return res
    })
  }

  const deleteSection = id => {
    return http.deleted(`/api/v1/article-sections/${id}`).then(res => {
      localStorage.removeItem('SECTIONS')
      setRelaod(!reload)
      return res
    })
  }

  return {
    sections,
    deleteSection,
    saveSection
  }
}