import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IBanner, IBannerDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IBannerFormProps extends IDialogFormProps {
  defaultValue?: IBannerDetail | null
  onConfirm?: (values: IBannerFormData) => void
}

export interface IBannerFormData extends IFormDataDefault {
  name?: string
  scopeNote?: string
  broaderTerm?: string
  narrowerTerm?: string
  usedFor?: string
  relatedTerm?: string
}
