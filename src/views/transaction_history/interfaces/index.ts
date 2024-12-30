import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'

export interface IReferenceServiceReport {
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
  participant: IReferenceServiceReportParticipant[]
  pic: IReferenceServiceReportPIC[]
  appointmentStatus: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IReferenceServiceReportPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export interface IReferenceServiceReportParticipant {
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

export declare interface IReferenceServiceReportResponse extends IDefaultResponse {
  data: IReferenceServiceReport[]
}

export declare interface IReferenceServiceReportState extends ILocalState {
  data: IReferenceServiceReport[]
}
