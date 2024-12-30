import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms/calendar`,
    name: 'Off Day',
    key: 'calendar',
    element: React.lazy(() => import('./Calendar')),
  },
]

export default routes
