import * as React from 'react'
import { IRouteConfig } from '../../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/detail-transaction-delivered',
    name: 'DetailTransactionDelivered',
    key: 'detailtransactiondelivered',
    element: React.lazy(() => import('./DetailTransactionDelivered')),
  },
]

export default routes
