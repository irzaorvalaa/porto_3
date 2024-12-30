import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/my-account/account',
    name: 'Account',
    key: 'account',
    element: React.lazy(() => import('./Account')),
  },
]

export default routes
