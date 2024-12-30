import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IMappingProduct } from '../../../interfaces'
import { IMappingProductFormData } from '../../form/interfaces'

export declare interface IMappingProductDeleteProps extends IDialogDeleteProps {
  defaultValue?: IMappingProduct | null
  onConfirm?: (values?: IMappingProductFormData) => void
}
