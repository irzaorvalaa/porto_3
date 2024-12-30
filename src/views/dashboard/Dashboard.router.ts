import * as React from 'react'
import { URL_ADMIN } from '../../constants/Parameter'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/dashboard`,
    name: 'Dashboard',
    key: 'dashboard',
    element: React.lazy(() => import('./Dashboard')),
  },
]

export default routes
