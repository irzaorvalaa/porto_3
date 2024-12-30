import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/school-setting/mapping-product`,
    name: 'Mapping Product',
    key: 'mapping_product',
    element: React.lazy(() => import('./MappingProduct')),
  },
]

export default routes
