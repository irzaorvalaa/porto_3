import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/product-cart',
    name: 'ProductCart',
    key: 'productcart',
    element: React.lazy(() => import('./ProductCart')),
  },
]

export default routes
