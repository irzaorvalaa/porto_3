import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IProduct } from '../../../interfaces'
import { IProductFormData } from '../../product_form/interfaces'

export declare interface IProductDeleteProps extends IDialogDeleteProps {
  defaultValue?: IProduct | null
  onConfirm?: (values: IProductFormData) => void
}
