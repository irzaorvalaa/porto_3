import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGuestBookExternal, IGuestBookExternalDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IGuestBookExternalFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  identityOptions?: IFormDataOption[]
  defaultValue?: IGuestBookExternalDetail | null
  onConfirm?: (values: IGuestBookExternalFormData) => void
}

export interface IGuestBookExternalFormData extends IFormDataDefault {
  isBinusian?: string
  identityNumber?: string
  identityType?: string
  campusId?: string
  campusName?: string
  name?: string
  email?: string
  institutionName?: string
  phoneNumber?: string
  needs?: string
}
