import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/product-detail',
    name: 'ProductDetail',
    key: 'productdetail',
    element: React.lazy(() => import('./ProductDetail')),
  },
]

export default routes
