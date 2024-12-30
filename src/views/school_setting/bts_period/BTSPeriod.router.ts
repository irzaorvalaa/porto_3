import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/school-setting/bts-period`,
    name: 'BTS Period',
    key: 'bts-period',
    element: React.lazy(() => import('./BTSPeriod')),
  },
]

export default routes
