import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import { URL_ADMIN } from '../../constants/Parameter'
import routerMappingProduct from './mapping_product/MappingProduct.router'
import routerBTSPeriod from './bts_period/BTSPeriod.router'
import routerSicepatPickup from './sicepat_pickup_schedule/SicepatPickup.router'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/school-setting`,
    name: 'School Setting',
    key: 'school_setting',
    element: React.lazy(() => import('./SchoolSetting')),
    children: [...routerMappingProduct, ...routerBTSPeriod, ...routerSicepatPickup],
  },
]

export default routes
