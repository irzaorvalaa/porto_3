import * as React from 'react'
import { URL_ADMIN } from '../../constants/Parameter'
import { IRouteConfig } from '../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/transaction-history`,
    name: 'Transaction History',
    key: 'transaction_history',
    element: React.lazy(() => import('./TransactionHistory')),
  },
]

export default routes
