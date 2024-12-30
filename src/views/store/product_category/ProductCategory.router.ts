import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store/product_category`,
    name: 'ProductCategory',
    key: 'product_category',
    element: React.lazy(() => import('./ProductCategory')),
  },
]

export default routes
