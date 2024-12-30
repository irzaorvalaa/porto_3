import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface IMemberManagement extends IDefaultResponseBE {
  binusianID: string
  memberCode: string
  name: string
  email: string
  campusID: string
  campusName: string
  academicGroup: string
  academicGroupDesc: string
  academicProgram: string
  academicProgramDesc: string
  academicOrganization: string
  academicOrganizationDesc: string
}

export interface IMemberLookup {
  id: string
  binusianID: string
  isLecturer: string
  memberCode: string
  name: string
  email: string
  campus: string | null
  campusDesc: string | null
  academicGroup: string | null
  academicGroupDesc: string | null
  academicProgram: string | null
  academicProgramDesc: string | null
  academicOrganization: string | null
  academicOrganizationDesc: string | null
}

export interface IMemberManagementDetail extends IMemberManagement {
  phoneNumber: string
  address: string
  expiredDate: string
}

export declare interface IMemberManagementResponse extends IDefaultResponse {
  data: IMemberManagement[] | null
}

export declare interface IMemberManagementDetailResponse extends IDefaultResponse {
  data: IMemberManagementDetail | null
}

export declare interface IMemberManagementLookupResponse extends IDefaultResponse {
  data: IMemberLookup | null
}

export interface IMemberManagementState extends ILocalState {
  data: IMemberManagement[]
}

export interface IMemberManagementFormState extends ILocalState {
  data: IMemberManagement | null
}

export interface IMemberManagementDetailState extends ILocalState {
  data: IMemberManagementDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}

export interface IFetchAcademicProgramStatus extends ILocalState {
  data: IGeneralFetch[]
}

export interface IFetchAcademicOrganizationStatus extends ILocalState {
  data: IGeneralFetch[]
}

export interface IFetchAcademicGroupStatus extends ILocalState {
  data: IGeneralFetch[]
}

export type IMasterMemberLookupMemberCallback = (
  data: IMemberLookup | null,
  error?: string,
) => void