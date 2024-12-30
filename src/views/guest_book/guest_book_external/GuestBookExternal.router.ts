import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/guestbook/guestbook-external`,
    name: 'Guestbook for External',
    key: 'guestbook_external',
    element: React.lazy(() => import('./GuestBookExternal')),
  },
]

export default routes
