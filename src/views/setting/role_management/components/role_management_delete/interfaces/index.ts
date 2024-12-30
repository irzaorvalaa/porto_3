import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IRoleManagement } from '../../../interfaces'
import { IRoleManagementFormData } from '../../role_management_form/interfaces'

export declare interface IRoleManagementDeleteProps extends IDialogDeleteProps {
  defaultValue?: IRoleManagement | null
  onConfirm?: (values?: IRoleManagementFormData) => void
}
