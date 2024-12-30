import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/guestbook-binusian',
    name: 'Guest Book Binusian',
    key: 'guestbook_binusian',
    element: React.lazy(() => import('./GuestBookBinusian')),
  },
]

export default routes
