import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IProductVariant, IProductVariantDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IProductVariantFormProps extends IDialogFormProps {
  typeOptions?: IFormDataOption[]
  defaultValue?: IProductVariantDetail | null
  onConfirm?: (values: IProductVariantFormData) => void
}

export interface IProductVariantFormData extends IFormDataDefault {
  label?: string
  isDigital?: string
}
