import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store/merchant`,
    name: 'Merchant',
    key: 'merchant',
    element: React.lazy(() => import('./Merchant')),
  },
]

export default routes
