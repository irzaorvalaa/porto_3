import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IUserManagement } from '../../../interfaces'
import { IUserManagementFormData } from '../../form/interfaces'

export declare interface IUserManagementDeleteProps extends IDialogDeleteProps {
  defaultValue?: IUserManagement | null
  onConfirm?: (values?: IUserManagementFormData) => void
}
