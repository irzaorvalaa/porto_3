import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IBanner, IBannerDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IBannerFormProps extends IDialogFormProps {
  defaultValue?: IBannerDetail | null
  onConfirm?: (values: IBannerFormData) => void
}

export interface IBannerFormData extends IFormDataDefault {
  headline?: string
  fileName?: string
  fileData?: string
  effDateStart?: string
  effDateEnd?: string
  externalUrl?: string
  sequenceNo?: number
  caption?: string
}
