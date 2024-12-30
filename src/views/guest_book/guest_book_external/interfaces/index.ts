import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { IAcademicProgramAssignation, ICampusAssignation, IDefaultResponse, IDefaultResponseBE, IRoleAssignation } from '../../../../interfaces/IResponse'

export interface IGuestBookExternal extends IDefaultResponseBE {
  recordDate: string
  userType: string
  campusId: string
  campusName: string
  identityNumber: string
  identityType: string
  name: string
  email: string
  institutionName: string
  phoneNumber: string
  needs: string
}

export interface IGuestBookExternalDetail extends IGuestBookExternal {
}

export declare interface IGuestBookExternalResponse extends IDefaultResponse {
  data: IGuestBookExternal[] | null
}

export declare interface IGuestBookExternalDetailResponse extends IDefaultResponse {
  data: IGuestBookExternalDetail | null
}

export interface IGuestBookExternalState extends ILocalState {
  data: IGuestBookExternal[]
}

export interface IGuestBookExternalFormState extends ILocalState {
  data: IGuestBookExternal | null
}

export interface IGuestBookExternalDetailState extends ILocalState {
  data: IGuestBookExternalDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
