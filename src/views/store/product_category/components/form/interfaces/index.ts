import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IProductCategory, IProductCategoryDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IProductCategoryFormProps extends IDialogFormProps {
  defaultValue?: IProductCategoryDetail | null
  onConfirm?: (values: IProductCategoryFormData) => void
}

export interface IProductCategoryFormData extends IFormDataDefault {
  label?: string
  topic?: string
}
