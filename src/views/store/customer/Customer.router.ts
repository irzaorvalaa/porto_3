import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store/customer`,
    name: 'Customer',
    key: 'customer',
    element: React.lazy(() => import('./Customer')),
  },
]

export default routes
