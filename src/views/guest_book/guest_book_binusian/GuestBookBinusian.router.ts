import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/guestbook/guestbook-binusian`,
    name: 'Guest Book Binusian',
    key: 'guestbook_binusian_redirect',
    element: React.lazy(() => import('./GuestBookBinusian')),
  },
]

export default routes
