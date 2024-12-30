import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/talk_to_us',
    name: 'Talk to Us',
    key: 'talk_to_us',
    element: React.lazy(() => import('./TalkToUsMonitor')),
  },
]

export default routes
