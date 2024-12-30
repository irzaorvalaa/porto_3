import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { URL_ADMIN } from '../../../constants/Parameter'

const GuestBookBinusian = () => {
  const location = useLocation()

  window.open("/guestbook-binusian", '_blank')

  const targetUrl = `${URL_ADMIN}/guestbook/guestbook-binusian-report`
  return <Navigate to={targetUrl} state={{ from: location }} replace />
}

export default GuestBookBinusian
