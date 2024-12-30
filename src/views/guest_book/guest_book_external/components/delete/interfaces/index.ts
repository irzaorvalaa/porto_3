import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IGuestBookExternal } from '../../../interfaces'
import { IGuestBookExternalFormData } from '../../form/interfaces'

export declare interface IGuestBookExternalDeleteProps extends IDialogDeleteProps {
  defaultValue?: IGuestBookExternal | null
  onConfirm?: (values?: IGuestBookExternalFormData) => void
}
