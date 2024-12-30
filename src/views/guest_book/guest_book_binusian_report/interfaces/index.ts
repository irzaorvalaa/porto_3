import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface IGuestBookBinusianReport {
  id: string
  entryDate: string
  campus: string
  binusianID: string
  name: string
  memberCode: string
  sourceCampusName: string
  academicGroupDesc: string
  academicProgramDesc: string
  academicOrganizationDesc: string
  borrowLocker: string
  lockerNumber: string
}

export declare interface IGuestBookBinusianReportResponse extends IDefaultResponse {
  data: IGuestBookBinusianReport[]
}

export declare interface IGuestBookBinusianReportState extends ILocalState {
  data: IGuestBookBinusianReport[]
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