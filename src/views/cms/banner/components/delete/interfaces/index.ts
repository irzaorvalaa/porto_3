import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IBanner } from '../../../interfaces'
import { IBannerFormData } from '../../form/interfaces'

export declare interface IBannerDeleteProps extends IDialogDeleteProps {
  defaultValue?: IBanner | null
  onConfirm?: (values?: IBannerFormData) => void
}
