import * as React from 'react'
import { URL_ADMIN } from '../../../constants/Parameter'
import { IRouteConfig } from '../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/school-setting/reference-clinic`,
    name: 'Reference Clinic',
    key: 'reference_clinic',
    element: React.lazy(() => import('./ReferenceClinic')),
  },
]

export default routes
