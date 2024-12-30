import { RootState } from '../bootstrap/App.reducers'
import { Store } from '../bootstrap/App.store'
import { URL_ADMIN } from '../constants/Parameter'
import { IAuthMenu, IAuthState } from '../interfaces/IAuth'

const excludeUrl = ['/dashboard']

const hasPrivilege = (pathname: string): boolean => {
  const state: RootState = Store.getState()
  const auth: IAuthState = state.auth
  const authMenu: IAuthMenu[] = auth.user?.defaultAssignedMenu ? auth.user.defaultAssignedMenu : []
  const url = pathname.replace(URL_ADMIN, '')
  const isExcludeUrl = excludeUrl.includes(url)

  if (isExcludeUrl) return true

  if (authMenu.length === 0) return false

  const find = authMenu.find((menu) => menu.menuUrl === url)

  if (!find) return false

  return true
}

export default hasPrivilege
