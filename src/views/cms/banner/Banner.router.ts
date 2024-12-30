import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms/banner`,
    name: 'Banner',
    key: 'banner',
    element: React.lazy(() => import('./Banner')),
  },
]

export default routes
