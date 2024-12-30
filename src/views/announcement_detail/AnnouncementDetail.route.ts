import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/announcement/:announcementID',
    name: 'AnnouncementDetail',
    key: 'announcement_detail',
    element: React.lazy(() => import('./AnnouncementDetail')),
  },
]

export default routes
