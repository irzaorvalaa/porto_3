import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IBTSPeriod, IBTSPeriodDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IBTSPeriodFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  defaultValue?: IBTSPeriodDetail | null
  onConfirm?: (values: IBTSPeriodFormData) => void
}

export interface IBTSPeriodFormData extends IFormDataDefault {
  label?: string
  selAllCampus?: string
  campusID?: string[]
  campusName?: string[]
}
