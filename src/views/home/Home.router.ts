import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    key: 'home',
    element: React.lazy(() => import('./Home')),
  },
]

export default routes
