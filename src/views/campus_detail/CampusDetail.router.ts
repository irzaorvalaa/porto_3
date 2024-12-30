import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/campus/:campusID',
    name: 'CampusDetail',
    key: 'campus_detail',
    element: React.lazy(() => import('./CampusDetail')),
  },
]

export default routes
