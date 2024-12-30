import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/user-management/user-login-report`,
    name: 'User Login Report',
    key: 'user_login_report',
    element: React.lazy(() => import('./UserLoginReport')),
  },
]

export default routes
