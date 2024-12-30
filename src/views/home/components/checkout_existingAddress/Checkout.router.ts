import * as React from 'react'
import { IRouteConfig } from '../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/checkout-existing-address',
    name: 'checkoutExistingAddress',
    key: 'checkoutexistingaddress',
    element: React.lazy(() => import('./CheckoutExistingAddress')),
  },
]

export default routes
