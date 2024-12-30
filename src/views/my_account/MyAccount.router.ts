import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import routerAccount from './components/account/Account.router'
import routerAddress from './components/address/Address.router'
import routerOrderHistory from './components/order_history/OrderHistory.router'

const routes: IRouteConfig[] = [
  {
    path: '/my-account',
    name: 'MyAccount',
    key: 'my-account',
    element: React.lazy(() => import('./MyAccount')),
    children: [...routerAccount, ...routerAddress, ...routerOrderHistory],
  },
]

export default routes
