import * as React from 'react'
import { IRouteConfig } from '../../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/detail-transaction-waiting',
    name: 'DetailTransactionWaiting',
    key: 'detailtransactionwaiting',
    element: React.lazy(() => import('./DetailTransactionWaiting')),
  },
]

export default routes
