import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface ISicepatPickup {
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
  participant: ISicepatPickupParticipant[]
  pic: ISicepatPickupPIC[]
  appointmentStatus: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface ISicepatPickupPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export interface ISicepatPickupParticipant {
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

export declare interface ISicepatPickupResponse extends IDefaultResponse {
  data: ISicepatPickup[]
}

export declare interface ISicepatPickupState extends ILocalState {
  data: ISicepatPickup[]
}
