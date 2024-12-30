import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface IReferenceClinic {
  id: string
  appointmentDate: string
  timeSlot: string
  referenceSchedule: string
  campus: string
  campusID: string
  requestorName: string
  referenceTopicName: string
  attendStatus: 'T' | 'F' | ''
  picLibrarianDesc: string
  participantDesc: string
  picLibrarian: IReferenceClinicPIC[]
  participant: IReferenceClinicParticipant[]
  appointmentStatus: string
  requestorStatus: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IReferenceClinicDetail extends IReferenceClinic {
  requestorEmail: string
  requestorBinusianID: string
  requestorWANumber: string
  requestorIsLecturer: string
  requestorAcademicGroupDesc: string | null
  requestorAcademicProgramDesc: string | null
  requestorAcademicOrganizationDesc: string | null
  isAttended: 'T' | 'F' | ''
  appointmentStatusID: string
  requestorStatusID: string
  zoomLink: string
}

export interface IReferenceClinicPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export interface IReferenceClinicParticipant {
  userId: string
  memberCode: string
  name: string
  email: string
  isLecturer: boolean
  academicOrganizaton: string | null
  academicOrganizatonDesc: string | null
  academicGroup: string | null
  academicGroupDesc: string | null
  academicProgram: string | null
  academicProgramDesc: string | null
}

export interface IReferenceClinicResponse extends IDefaultResponse {
  data: IReferenceClinic[]
}

export interface IReferenceClinicDetailResponse extends IDefaultResponse {
  data: IReferenceClinicDetail | null
}

export interface IReferenceClinicState extends ILocalState {
  data: IReferenceClinic[]
}

export interface IReferenceClinicDetailState extends ILocalState {
  data: IReferenceClinicDetail | null
}

export interface IReferenceClinicFormState extends ILocalState {
  data: IReferenceClinic | null
}
