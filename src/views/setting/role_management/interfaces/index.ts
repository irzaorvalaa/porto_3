import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export declare interface IRoleManagement extends IDefaultResponseBE {
  name: string
}

export declare interface IRoleManagementMenu {
  menuID: string
  menuUrl: string
  name: string
  sequenceNo: number
  parentID: string
  isParent: boolean
  isCreate?: boolean
  isRead?: boolean
  isUpdate?: boolean
  isDelete?: boolean
  allowCreate?: boolean
  allowRead?: boolean
  allowUpdate?: boolean
  allowDelete?: boolean
}

export declare interface IRoleManagementDetail extends IRoleManagement {
  assignedMenu: IRoleManagementMenu[]
}

export declare interface IRoleManagementResponse extends IDefaultResponse {
  data: IRoleManagement[] | null
}

export declare interface IRoleManagementMenuResponse extends IDefaultResponse {
  data: IRoleManagementMenu[] | null
}

export declare interface IRoleManagementDetailResponse extends IDefaultResponse {
  data: IRoleManagementDetail | null
}

export declare interface IRoleManagementState extends ILocalState {
  data: IRoleManagement[]
}

export declare interface IRoleManagementFormState extends ILocalState {
  data: IRoleManagement | null
}

export declare interface IRoleManagementMenuState extends ILocalState {
  data: IRoleManagementMenu[] | null
}

export declare interface IRoleManagementDetailState extends ILocalState {
  data: IRoleManagementDetail | null
}
