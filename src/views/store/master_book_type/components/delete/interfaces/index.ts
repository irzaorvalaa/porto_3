import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IBookType } from '../../../interfaces'
import { IBookTypeFormData } from '../../form/interfaces'

export declare interface IBookTypeDeleteProps extends IDialogDeleteProps {
  defaultValue?: IBookType | null
  onConfirm?: (values?: IBookTypeFormData) => void
}
