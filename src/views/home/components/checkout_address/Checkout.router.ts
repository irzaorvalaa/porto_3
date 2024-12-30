import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/checkout-address',
    name: 'checkoutaddress',
    key: 'checkoutaddress',
    element: React.lazy(() => import('./CheckoutAddress')),
  },
]

export default routes
