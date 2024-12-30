import { IRouteConfig } from '../interfaces/IRouteConfig'
import routerHome from '../views/home/Home.router'
import routerLogin from '../views/login/Login.router'
import routerDetail from '../views/detail/Detail.router'
import routerCampusDetail from '../views/campus_detail/CampusDetail.router'
import routerRead from '../views/read/Read.router'
import routerSearch from '../views/search/Search.router'
import routerCollection from '../views/collection/Collection.router'
import routerTalkToUs from '../views/talk_to_us_monitor/TalkToUsMonitor.router'
import routerNewsEventDetail from '../views/news_event_detail/NewsEventDetail.router'
import routerAnnouncementDetail from '../views/announcement_detail/AnnouncementDetail.route'
import routerProductDetail from '../views/product_detail/Product.Detail.router'
import routerProductCart from '../views/product_cart/Product.Cart.router'
import routerHomeProductCategory from '../views/home/components/product_category/HomeProductCategory.router'
import routerDetailTransactionWaiting from '../views/home/components/detail_transaction/detail_transaction_waiting/DetailTransactionWaiting.router'
import routerDetailTransactionCompleted from '../views/home/components/detail_transaction/detail_transaction_completed/DetailTransactionCompleted.router'
import routerDetailTransactionDelivered from '../views/home/components/detail_transaction/detail_transaction_delivered/DetailTransactionDelivered.router'
import routerMyAccount from '../views/my_account/MyAccount.router'
import routerCheckoutAddress from '../views/home/components/checkout_address/Checkout.router'
import routerExistingAddress from '../views/home/components/checkout_existingAddress/Checkout.router'
import routerPayment from '../views/payment/Payment.router'

export const routesConfig: IRouteConfig[] = [
  ...routerHome,
  ...routerLogin,
  ...routerDetail,
  ...routerCampusDetail,
  ...routerRead,
  ...routerSearch,
  ...routerCollection,
  ...routerTalkToUs,
  ...routerNewsEventDetail,
  ...routerAnnouncementDetail,
  ...routerProductDetail,
  ...routerProductCart,
  ...routerHomeProductCategory,
  ...routerDetailTransactionWaiting,
  ...routerCheckoutAddress,
  ...routerExistingAddress,
  ...routerDetailTransactionCompleted,
  ...routerDetailTransactionDelivered,
  ...routerMyAccount,
  ...routerPayment,
]
