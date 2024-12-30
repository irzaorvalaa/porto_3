import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { ICustomer, ICustomerDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface ICustomerFormProps extends IDialogFormProps {
  defaultValue?: ICustomerDetail | null
  onConfirm?: (values: ICustomerFormData) => void
}

export interface ICustomerFormData extends IFormDataDefault {
  name?: string
}
