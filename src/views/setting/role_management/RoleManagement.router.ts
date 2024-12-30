import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/setting/role-management`,
    name: 'Role Management',
    key: 'role_management',
    element: React.lazy(() => import('./RoleManagement')),
  },
]

export default routes
