import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import { URL_ADMIN } from '../../constants/Parameter'
import routerCalendar from './calendar/Calendar.router'
import routerCampusLocation from './campus/Campus.router'
import routerAnnouncement from './announcement/Announcement.router'
import routerBanner from './banner/Banner.router'
import routerNews from './news/News.router'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/cms`,
    name: 'Content Management',
    key: 'content-management',
    element: React.lazy(() => import('./CMS')),
    children: [...routerCalendar, ...routerCampusLocation, ...routerAnnouncement, ...routerBanner, ...routerNews],
  },
]

export default routes
