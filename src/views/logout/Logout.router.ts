import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/logout',
    name: 'Logout',
    key: 'logout',
    element: React.lazy(() => import('./Logout')),
  },
]

export default routes
