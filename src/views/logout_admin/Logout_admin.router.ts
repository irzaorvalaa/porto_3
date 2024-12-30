import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/admin/logout',
    name: 'Logout',
    key: 'logout_admin',
    element: React.lazy(() => import('./Logout_admin')),
  },
]

export default routes
