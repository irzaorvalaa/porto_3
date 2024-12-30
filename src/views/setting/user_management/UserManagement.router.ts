import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/setting/user-management`,
    name: 'User Management',
    key: 'user_management',
    element: React.lazy(() => import('./UserManagement')),
  },
]

export default routes
