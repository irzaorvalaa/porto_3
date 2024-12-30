import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { INews, INewsDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface INewsFormProps extends IDialogFormProps {
  categoryOptions?: IFormDataOption[]
  campusOptions?: IGeneralFetch[]
  defaultValue?: INewsDetail | null
  onConfirm?: (values: INewsFormData) => void
}

export interface INewsFormData extends IFormDataDefault {
  title?: string
  fileName?: string
  fileData?: string
  isEvent?: string
  date?: string
  selAllCampus?: string
  campusID?: string[]
  campusName?: string[]
  author?: string
  caption?: string
  description?: string
}
