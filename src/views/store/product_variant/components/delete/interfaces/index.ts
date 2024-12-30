import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IProductVariant } from '../../../interfaces'
import { IProductVariantFormData } from '../../form/interfaces'

export declare interface IProductVariantDeleteProps extends IDialogDeleteProps {
  defaultValue?: IProductVariant | null
  onConfirm?: (values?: IProductVariantFormData) => void
}
