export declare interface AvatarMenuProps {
  name?: string
  userType?: '0' | '1' | '2' | '3' | null
  src?: string
  roleName?: string
  showName?: boolean
  showChangePassword?: boolean
  showProfile?: boolean
  onLogout?: typeof onLogout
  onChangePassword?: typeof onChangePassword
  onClickProfile?: typeof onClickProfile
}

export declare function onLogout(): void
export declare function onChangePassword(): void
export declare function onClickProfile(): void
