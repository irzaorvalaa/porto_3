import { IDialogFormProps } from '../../dialog_form/interfaces'

export declare interface IDialogDeleteProps<T = any> extends IDialogFormProps {
  label?: string
  onConfirm?: (values?: T) => void
}
