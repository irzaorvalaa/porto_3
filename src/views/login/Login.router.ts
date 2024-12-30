import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    key: 'login',
    element: React.lazy(() => import('./Login')),
  },
]

export default routes
