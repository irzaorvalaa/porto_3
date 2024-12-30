import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault } from '../../../../../../interfaces/IFormData'
import { IRoleManagement, IRoleManagementDetail, IRoleManagementMenu } from '../../../interfaces'

export declare interface IRoleManagementFormProps extends IDialogFormProps {
  defaultValue?: IRoleManagement | null
  listMenu?: IRoleManagementMenu[] | null
  detail?: IRoleManagementDetail | null
  onConfirm?: (values?: IRoleManagementFormData) => void
}

export declare interface IRoleManagementFormData extends IFormDataDefault {
  name?: string
  listRead?: string[]
  listCreate?: string[]
  listUpdate?: string[]
  listDelete?: string[]
}
