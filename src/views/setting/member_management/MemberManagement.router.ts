import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/user-management/member-management`,
    name: 'Member Management',
    key: 'member_management',
    element: React.lazy(() => import('./MemberManagement')),
  },
]

export default routes
