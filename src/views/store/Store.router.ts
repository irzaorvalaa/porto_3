import * as React from 'react'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import { URL_ADMIN } from '../../constants/Parameter'
import routerMerchant from './merchant/Merchant.router'
import routerProductCategory from './product_category/ProductCategory.router'
import routerBanner from './banner/Banner.router'
import routerProductVariant from './product_variant/ProductVariant.router'
import routerCustomer from './customer/Customer.router'
import routerProduct from './product/Product.router'

const routes: IRouteConfig[] = [
  {
    path: `${URL_ADMIN}/store`,
    name: 'Store',
    key: 'store',
    element: React.lazy(() => import('./Store')),
    children: [
      ...routerMerchant,
      ...routerBanner,
      ...routerProductCategory,
      ...routerProductVariant,
      ...routerCustomer,
      ...routerProduct,
    ],
  },
]

export default routes
