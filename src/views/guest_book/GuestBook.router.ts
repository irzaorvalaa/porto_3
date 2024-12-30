import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import { URL_ADMIN } from '../../constants/Parameter'
import routerGuestBookExternal from './guest_book_external/GuestBookExternal.router'
import routerGuestBookReport from './guest_book_binusian_report/GuestBookBinusianReport.router'
import routerGuestBookReportExternal from './guest_book_external_report/GuestBookExternalReport.router'
import routerGuestBookBinusian from './guest_book_binusian/GuestBookBinusian.router'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/guestbook`,
    name: 'Guest Book',
    key: 'guest_book',
    element: React.lazy(() => import('./GuestBook')),
    children: [
      ...routerGuestBookExternal,
      ...routerGuestBookBinusian,
      ...routerGuestBookReport,
      ...routerGuestBookReportExternal,
    ],
  },
]

export default routes
