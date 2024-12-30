import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/detail/:collectionID',
    name: 'Detail',
    key: 'detail',
    element: React.lazy(() => import('./Detail')),
  },
]

export default routes
