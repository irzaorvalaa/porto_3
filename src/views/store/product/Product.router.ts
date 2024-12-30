import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store/product`,
    name: 'Product',
    key: 'product',
    element: React.lazy(() => import('./Product')),
  },
]

export default routes
