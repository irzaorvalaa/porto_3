import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IMemberManagement, IMemberManagementDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IMemberManagementFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  academicOrganizationOptions?: IGeneralFetch[]
  defaultValue?: IMemberManagementDetail | null
  onConfirm?: (values: IMemberManagementFormData) => void
}

export interface IMemberManagementFormData extends IFormDataDefault {
  binusianID?: string
  memberCode?: string
  name?: string
  email?: string

  campusID?: string
  campusName?: string
  academicProgram?: string
  academicProgramDesc?: string
  academicOrganization?: string
  academicOrganizationDesc?: string
  phoneNumber?: string
  address?: string
  expiredDate?: string
}
