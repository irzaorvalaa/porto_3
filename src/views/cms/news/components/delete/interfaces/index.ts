import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { INews } from '../../../interfaces'
import { INewsFormData } from '../../form/interfaces'

export declare interface INewsDeleteProps extends IDialogDeleteProps {
  defaultValue?: INews | null
  onConfirm?: (values?: INewsFormData) => void
}
