import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  IAcademicProgramAssignation,
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
  IRoleAssignation,
} from '../../../../interfaces/IResponse'
import { IMemberLookup } from '../../member_management/interfaces'

export interface IUserManagement extends IDefaultResponseBE {
  isBinusian: 'T' | 'F'
  userType: string
  name: string
  email: string
  campusAssignationDesc: string
  academicProgramAssignationDesc: string
  roleAssignationDesc: string
  campusAssignation: ICampusAssignation[]
  academicProgramAssignation: IAcademicProgramAssignation[]
  roleAssignation: IRoleAssignation[]
}

export interface IUserManagementDetail extends IUserManagement {
  binusianID: string
  phoneNumber: string
  institutionName: string
  institutionAddress: string
}

export interface IUserManagementLookup {
  id: string
  binusianID: string
  name: string
  email: string
}

export declare interface IUserManagementResponse extends IDefaultResponse {
  data: IUserManagement[] | null
}

export declare interface IUserManagementDetailResponse extends IDefaultResponse {
  data: IUserManagementDetail | null
}

export declare interface IUserManagementLookupResponse extends IDefaultResponse {
  data: IUserManagementLookup | null
}

export interface IUserManagementState extends ILocalState {
  data: IUserManagement[]
}

export interface IUserManagementFormState extends ILocalState {
  data: IUserManagement | null
}

export interface IUserManagementDetailState extends ILocalState {
  data: IUserManagementDetail[]
}

export interface IFetchLookupBinusianStatus extends ILocalState {
  data: IUserManagementLookup[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}

export interface IFetchAcademicProgramStatus extends ILocalState {
  data: IGeneralFetch[]
}

export interface IFetchRoleStatus extends ILocalState {
  data: IGeneralFetch[]
}

export type IUserManagementLookupMemberCallback = (
  data: IUserManagementLookup | null,
  error?: string,
) => void

export type IMasterMemberLookupMemberCallback = (data: IMemberLookup | null, error?: string) => void
