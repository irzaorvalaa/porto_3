import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IMappingProduct, IMappingProductDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IMappingProductFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  dayOptions?: IFormDataOption[]
  defaultValue?: IMappingProductDetail | null
  onConfirm?: (values: IMappingProductFormData) => void
}

export interface IMappingProductFormData extends IFormDataDefault {
  label?: string
  campusID?: string
  campusName?: string
  dayName?: string
  startTime?: string
  endTime?: string
}
