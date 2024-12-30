import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IBookType, IBookTypeDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IBookTypeFormProps extends IDialogFormProps {
  defaultValue?: IBookTypeDetail | null
  onConfirm?: (values: IBookTypeFormData) => void
}

export interface IBookTypeFormData extends IFormDataDefault {
  label?: string
}
