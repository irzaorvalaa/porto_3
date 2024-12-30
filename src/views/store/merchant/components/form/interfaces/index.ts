import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IMerchant, IMerchantDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IMerchantFormProps extends IDialogFormProps {
  defaultValue?: IMerchantDetail | null
  onConfirm?: (values: IMerchantFormData) => void
}

export interface IMerchantFormData extends IFormDataDefault {
  name?: string
  city?: string
  phoneNumber?: string
  email?: string
  address?: string
  sharedUsername?: string
  sharedPassword?: string
  isLTI?: string
}
