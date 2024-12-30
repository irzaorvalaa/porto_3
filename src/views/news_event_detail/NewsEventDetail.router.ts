import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/news/:newsID',
    name: 'NewsEventDetail',
    key: 'news_event_detail',
    element: React.lazy(() => import('./NewsEventDetail')),
  },
]

export default routes
