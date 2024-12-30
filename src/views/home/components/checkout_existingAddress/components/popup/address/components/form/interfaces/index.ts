import { IDialogFormProps } from '../../../../../../../../../../components/dialog_form/interfaces'
import {
  IFormDataDefault,
  IFormDataOption,
} from '../../../../../../../../../../interfaces/IFormData'
import { IAddress, IAddressDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../../../../../interfaces/IGeneralFetch'

export interface IAddressFormProps extends IDialogFormProps {
  typeOptions?: IFormDataOption[]
  defaultValue?: IAddressDetail | null
  onConfirm?: (values: IAddressFormData) => void
}

export interface IAddressFormData extends IFormDataDefault {
  label?: string
  isDigital?: string
}
