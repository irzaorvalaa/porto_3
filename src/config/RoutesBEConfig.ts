import { IRouteConfig } from '../interfaces/IRouteConfig'
import routerDashboard from '../views/dashboard/Dashboard.router'
import routerSetting from '../views/setting/Setting.router'
import routerGuestBook from '../views/guest_book/GuestBook.router'
import routerCMS from '../views/cms/CMS.router'
import routerSchoolSetting from '../views/school_setting/SchoolSetting.router'
import routerTransactionHistory from '../views/transaction_history/TransactionHistory.router'
import routerReport from '../views/report_management/Report.router'
import routerStore from '../views/store/Store.router'

export const routesConfig: IRouteConfig[] = [
  ...routerDashboard,
  ...routerTransactionHistory,
  ...routerReport,
  ...routerSetting,
  ...routerStore,
  ...routerSchoolSetting,
  ...routerGuestBook,
  ...routerCMS,
]
