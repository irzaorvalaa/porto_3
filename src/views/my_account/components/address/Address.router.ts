import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/my-account/address',
    name: 'Address',
    key: 'address',
    element: React.lazy(() => import('./Adress')),
  },
]

export default routes
