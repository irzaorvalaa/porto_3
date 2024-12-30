import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store/product-variant`,
    name: 'Product Variant',
    key: 'product_variant',
    element: React.lazy(() => import('./ProductVariant')),
  },
]

export default routes
