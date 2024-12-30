import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/guestbook/guestbook-external-report`,
    name: 'Guestbook External Report',
    key: 'guestbook_external_report',
    element: React.lazy(() => import('./GuestBookExternalReport')),
  },
]

export default routes
