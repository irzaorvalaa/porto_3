import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/product-category',
    name: 'ProductCategory',
    key: 'productcategory',
    element: React.lazy(() => import('./HomeProductCategory')),
  },
]

export default routes
