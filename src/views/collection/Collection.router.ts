import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/collection/:category',
    name: 'Collection',
    key: 'collection',
    element: React.lazy(() => import('./Collection')),
  },
]

export default routes
