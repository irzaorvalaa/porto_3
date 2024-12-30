import * as React from 'react'
import { URL_ADMIN } from '../../constants/Parameter'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/report`,
    name: 'Report',
    key: 'report',
    element: React.lazy(() => import('./Report')),
  },
]

export default routes
