import { IBECampus } from '../../../../../interfaces/ICampus'
import { IFormDataDefault } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IGuestBookMember } from '../../../interfaces'

export interface IGuestBookBinusianFormProps {
  campus?: IBECampus | null
  loading?: boolean
  lockerBorrowing?: boolean
  onConfirm?: (values: IGuestBookBinusianFormData) => void
  onSetting?: () => void
  onLookupMember?: (memberCode: string, cb: IGuestBookLookupMemberCallback) => void
}

export interface IGuestBookBinusianFormData extends IFormDataDefault {
  binusianId?: string
  memberCode?: string
  campusId?: string
  campusName?: string
  name?: string
  email?: string
  isLecturer?: string
  sourceCampusId?: string
  sourceCampusName?: string
  academicGroup?: string
  academicGroupDesc?: string
  academicOrganization?: string
  academicOrganizationDesc?: string
  academicProgram?: string
  academicProgramDesc?: string
  isBorrowLocker?: 'T' | 'F' | ''
  lockerNumber?: string
}

export type IGuestBookLookupMemberCallback = (
  member: IGuestBookMember | null,
  error?: string,
) => void
