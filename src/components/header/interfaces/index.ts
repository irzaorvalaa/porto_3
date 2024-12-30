import { IAuthValidate } from '../../../interfaces/IAuth'

export declare interface IHeaderMenu {
  title: string
  url: string
  isLink: boolean
  key: string
}

export declare interface IHeaderProps {
  user?: IAuthValidate | null
  isLoggedIn?: boolean
  onChangePassword?: () => void
  onLogout?: () => void
  onClickProfile?: () => void
  onClickMenu?: (menu: IHeaderMenu) => void
  window?: () => Window,
}
