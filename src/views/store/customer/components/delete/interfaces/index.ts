import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { ICustomer } from '../../../interfaces'
import { ICustomerFormData } from '../../form/interfaces'

export declare interface ICustomerDeleteProps extends IDialogDeleteProps {
  defaultValue?: ICustomer | null
  onConfirm?: (values?: ICustomerFormData) => void
}
