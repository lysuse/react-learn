import { useState, useEffect } from 'react';
import http from '@/utils/request'

export const useBanner = () => {
  const [banners, setBanners] = useState([])
  useEffect(() => {
    http.get(`/api/v1/banners`).then(res => {
      if (res.data && res.data.length > 0) {
        setBanners(res.data)
      }
    })
  }, banners)
  return banners
}