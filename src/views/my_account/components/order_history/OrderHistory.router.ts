import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/my-account/order-history',
    name: 'OrderHistory',
    key: 'order-history',
    element: React.lazy(() => import('./OrderHistory')),
  },
]

export default routes
