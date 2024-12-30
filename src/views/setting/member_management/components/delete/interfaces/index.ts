import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IMemberManagement } from '../../../interfaces'
import { IMemberManagementFormData } from '../../form/interfaces'

export declare interface IMemberManagementDeleteProps extends IDialogDeleteProps {
  defaultValue?: IMemberManagement | null
  onConfirm?: (values?: IMemberManagementFormData) => void
}
