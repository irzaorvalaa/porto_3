import { IDefaultResponse } from './IResponse'

export declare interface IAuthValidate {
  userID: string
  name: string
  email: string
  photoUrl: string
  assignedCampus: IAuthAssignedCampus[] | null
  assignedAcademicProgram: IAuthAcademicProgram[] | null
  assignedRole: IAuthRoleAssignation[] | null
  defaultRoleID: string
  defaultRoleName: string
  defaultAssignedMenu: IAuthMenu[] | null
}

export declare interface IAuthAssignedCampus {
  campusID: string
  campusName: string
}

export declare interface IAuthAcademicProgram {
  academicProgram: string
  academicProgramDesc: string
}

export declare interface IAuthRoleAssignation {
  roleId: string
  roleName: string
}

export declare interface IAuthMenu {
  menuID: string
  menuUrl: string
  name: string
  sequenceNo: number
  isParent: boolean
  parentID: string
  allowRead: boolean
  allowCreate: boolean
  allowUpdate: boolean
  allowDelete: boolean
  allowUpload: boolean
}

export declare interface IAuthState {
  isLoggedIn: boolean
  token: string | null
  isLoading: boolean
  isValidating: boolean
  error?: any
  user?: IAuthValidate
}

export declare interface IAuthFEState {
  isLoggedIn: boolean
  token: string | null
  isLoading: boolean
  isValidating: boolean
  error?: any
  user?: IAuthValidate
}

export declare interface IAuthLoginAzureRequest {
  email: string
  platform: string
}

export declare interface IAuthLoginVendorRequest {
  email: string
  password: string
}

export declare interface IAuthLoginResponse extends IDefaultResponse {
  data: string
}

export declare interface IAuthValidateResponse extends IDefaultResponse {
  data: IAuthValidate | string
}

export type IAuthLoginCallback = (data: IAuthValidate | null, error?: any) => void
