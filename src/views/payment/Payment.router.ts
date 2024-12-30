import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/payment',
    name: 'Payment',
    key: 'payment',
    element: React.lazy(() => import('./Payment')),
  },
]

export default routes
