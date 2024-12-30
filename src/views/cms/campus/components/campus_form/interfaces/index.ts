import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IBECampus, IBECampusDetail } from '../../../../../../interfaces/ICampus'
import { IFormDataDefault } from '../../../../../../interfaces/IFormData'
import { IUserManagementLookupMemberCallback } from '../../../../../setting/user_management/interfaces'

export interface ICampusFormProps extends IDialogFormProps {
  defaultValue?: IBECampus | null
  onConfirm?: (values: ICampusFormData) => void
  onOpen?: (campus: IBECampus, cb: ICampusOpenCallback) => void
  onLookupBinusian?: (keyword: string, cb: IUserManagementLookupMemberCallback) => void
}

export interface ICampusFormData extends IFormDataDefault {
  fileName?: string
  fileData?: string
  name?: string
  email?: string
  phoneNumberExt?: string
  phoneNumberWA?: string
  serviceDay?: string[]
  serviceHourStart?: string[]
  serviceHourEnd?: string[]
  serviceHour?: ICampusServiceHourFormData[]
  picUserID?: string[]
  picBinusianID?: string[]
  picName?: string[]
  picEmail?: string[]
  pic?: ICampusPICFormData[]
  address?: string
  provideLockerBorrowing?: 'T' | 'F' | ''
}

export interface ICampusServiceHourFormData {
  day: string
  hourStart: string
  hourEnd: string
}

export interface ICampusPICFormData {
  userID: string
  binusianID: string
  name: string
  email: string
}

export interface ICampusTime {
  [key: string]: Date | null
}

export type ICampusOpenCallback = (campus: IBECampusDetail) => void
