import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms/campus`,
    name: 'Campus',
    key: 'campus',
    element: React.lazy(() => import('./Campus')),
  },
]

export default routes
