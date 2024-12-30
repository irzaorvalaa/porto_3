import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/search/:keyword',
    name: 'Search',
    key: 'search',
    element: React.lazy(() => import('./Search')),
  },
]

export default routes
