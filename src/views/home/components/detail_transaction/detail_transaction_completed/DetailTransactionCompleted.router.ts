import * as React from 'react'
import { IRouteConfig } from '../../../../../interfaces/IRouteConfig'

const routes: IRouteConfig[] = [
  {
    path: '/detail-transaction-completed',
    name: 'DetailTransactionCompleted',
    key: 'detailtransactioncompleted',
    element: React.lazy(() => import('./DetailTransactionCompleted')),
  },
]

export default routes
