import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/collection-management/collection-book-type`,
    name: 'Master Book Type',
    key: 'collection_book_type',
    element: React.lazy(() => import('./BookType')),
  },
]

export default routes
