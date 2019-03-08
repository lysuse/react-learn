import { useState, useEffect } from 'react';
import http from '@/utils/request'

export const useSection = () => {
  const [sections, setSections] = useState([])

  const getChildrenNodes = (datas = [], pid) => {
    const childrens = datas.filter(s => s.pid === pid)
    for (let index = 0; childrens.length > 0 && index < childrens.length; index++) {
      const item = childrens[index]
      item.children = getChildrenNodes(datas, item.id)
    }
    return childrens
  }
  useEffect(() => {
    http.get('/api/v1/article-sections').then(res => {
      setSections(getChildrenNodes(res.data, null))
    })
  }, sections)
  return sections
}