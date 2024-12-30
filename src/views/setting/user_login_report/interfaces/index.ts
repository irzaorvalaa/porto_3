import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface IUserLoginReport {
  id: string
  loginDate: string
  binusianId: string
  memberCode: string
  email: string
  name: string
  loginSource: string
  ipAddress: string
}

export declare interface IUserLoginReportResponse extends IDefaultResponse {
  data: IUserLoginReport[]
}

export declare interface IUserLoginReportState extends ILocalState {
  data: IUserLoginReport[]
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
