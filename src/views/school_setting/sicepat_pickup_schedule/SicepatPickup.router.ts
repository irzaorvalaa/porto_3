import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/school-setting/sicepat-pickup`,
    name: 'Sicepat Pickup Schedule',
    key: 'sicepat_pickup',
    element: React.lazy(() => import('./SicepatPickup')),
  },
]

export default routes
