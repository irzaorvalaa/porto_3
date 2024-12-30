import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms/announcement`,
    name: 'Announcement',
    key: 'announcement',
    element: React.lazy(() => import('./Announcement')),
  },
]

export default routes
