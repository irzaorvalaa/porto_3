import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import routerRoleManagement from './role_management/RoleManagement.router'
import routerUserManagement from './user_management/UserManagement.router'

import { URL_ADMIN } from '../../constants/Parameter'
const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/setting`,
    name: 'Setting',
    key: 'setting',
    element: React.lazy(() => import('./Setting')),
    children: [...routerRoleManagement, ...routerUserManagement],
  },
]

export default routes
