import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IProductCategory } from '../../../interfaces'
import { IProductCategoryFormData } from '../../form/interfaces'

export declare interface IProductCategoryDeleteProps extends IDialogDeleteProps {
  defaultValue?: IProductCategory | null
  onConfirm?: (values?: IProductCategoryFormData) => void
}
