import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'

export interface IReport {
  id: string
  date: string
  timeSlot: string
  requestorID: string
  requestorName: string
  requestorEmail: string
  requestorAcademicOrganizationGroup: string | null
  requestorWaNumber: string
  attendStatus: string
  topic: string
  campusName: string
  participant: IReportParticipant[]
  pic: IReportPIC[]
  appointmentStatus: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IReportPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export interface IReportParticipant {
  userId: string
  memberCode: string
  name: string
  email: string
  academicOrganizaton: string
  academicOrganizatonDesc: string
  academicGroup: string
  academicGroupDesc: string
  department: string
  departmentDesc: string
}

export declare interface IReportResponse extends IDefaultResponse {
  data: IReport[]
}

export declare interface IReportState extends ILocalState {
  data: IReport[]
}
