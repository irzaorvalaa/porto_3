import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/guestbook/guestbook-binusian-report`,
    name: 'Guestbook Binusian Report',
    key: 'guestbook_binusian_report',
    element: React.lazy(() => import('./GuestBookBinusianReport')),
  },
]

export default routes
