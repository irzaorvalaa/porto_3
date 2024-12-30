import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import {
  IUserManagement,
  IUserManagementDetail,
  IUserManagementLookupMemberCallback,
} from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IUserManagementFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  roleOptions?: IGeneralFetch[]
  defaultValue?: IUserManagementDetail | null
  onConfirm?: (values: IUserManagementFormData) => void
  onLookupBinusian?: (keyword: string, cb: IUserManagementLookupMemberCallback) => void
}

export interface IUserManagementFormData extends IFormDataDefault {
  isBinusian?: string
  name?: string
  email?: string
  selAllCampus?: string
  campusID?: string[]
  campusName?: string[]
  academicProgram?: string[]
  academicProgramDesc?: string[]
  roleID?: string[]
  roleName?: string[]
  binusianID?: string
  phoneNumber?: string
  institutionName?: string
  institutionAddress?: string
  password?: string
}
