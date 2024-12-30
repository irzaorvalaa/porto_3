import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms/news`,
    name: 'News',
    key: 'news',
    element: React.lazy(() => import('./News')),
  },
]

export default routes
