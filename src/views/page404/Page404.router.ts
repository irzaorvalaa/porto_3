import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '*',
    key: '*',
    index: true,
    name: '',
    element: React.lazy(() => import('./Page404')),
  },
]

export default routes
