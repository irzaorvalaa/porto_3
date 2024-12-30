import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import {
  IMasterMemberLookupMemberCallback,
  IUserManagementLookupMemberCallback,
} from '../../../../../setting/user_management/interfaces'
import { IReferenceClinic, IReferenceClinicDetail } from '../../../interfaces'
export interface IReferenceClinicFormProps extends IDialogFormProps {
  defaultValue?: IReferenceClinic | null
  timeSlotOptions?: IGeneralFetch[]
  timeSlotLoading?: boolean
  onConfirm?: (values: IReferenceClinicFormData) => void
  onOpen?: (referenceClinic: IReferenceClinic | null, cb: IReferenceClinicFormOpenCallback) => void
  onLookupBinusian?: (keyword: string, cb: IUserManagementLookupMemberCallback) => void
  onLookupMember?: (keyword: string, cb: IMasterMemberLookupMemberCallback) => void
  onChangeAppointmentDate?: (date: string) => void
}

export interface IReferenceClinicFormData extends IFormDataDefault {
  appointmentDate?: string
  timeSlot?: string
  referenceScheduleID?: string
  picUserID?: string[]
  picBinusianID?: string[]
  picName?: string[]
  picEmail?: string[]
  picList?: IReferenceClinicFormPIC[]
  participantUserID?: string[]
  memberCode?: string[]
  participantName?: string[]
  participantEmail?: string[]
  participantIsLecturer?: boolean[]
  participantAcademicGroup?: string[]
  participantAcademicGroupDesc?: string[]
  participantAcademicProgram?: string[]
  participantAcademicProgramDesc?: string[]
  participantAcademicOrganization?: string[]
  participantAcademicOrganizationDesc?: string[]
  participantList?: IReferenceClinicFormParticipant[]
  appointmentStatus?: string
  requestorIsLecturer?: string
  attendStatus?: 'F' | 'T' | ''
  zoomLink?: string
}

export interface IReferenceClinicFormParticipant {
  userId: string
  memberCode: string
  name: string
  email: string
  isLecturer: boolean
  academicGroup: string
  academicGroupDesc: string
  academicProgram: string
  academicProgramDesc: string
  academicOrganization: string
  academicOrganizationDesc: string
}

export interface IReferenceClinicFormPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export type IReferenceClinicFormOpenCallback = (
  referenceScheduleOptions: IGeneralFetch[] | null,
  meetingLinkOptions: IGeneralFetch[] | null,
  detail: IReferenceClinicDetail | null,
  error?: string,
) => void
