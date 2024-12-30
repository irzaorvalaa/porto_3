import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { ICampusDetail } from '../../../../../../interfaces/ICampus'
import { ICampusFormData } from '../../campus_form/interfaces'

export declare interface ICampusDeleteProps extends IDialogDeleteProps {
  defaultValue?: ICampusDetail | null
  onConfirm?: (values?: ICampusFormData) => void
}
