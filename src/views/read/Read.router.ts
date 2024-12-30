import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/read/:collectionID',
    name: 'Read',
    key: 'read',
    element: React.lazy(() => import('./Read')),
  },
]

export default routes
