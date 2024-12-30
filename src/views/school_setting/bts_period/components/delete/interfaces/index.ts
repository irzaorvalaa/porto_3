import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IBTSPeriod } from '../../../interfaces'
import { IBTSPeriodFormData } from '../../form/interfaces'

export declare interface IBTSPeriodDeleteProps extends IDialogDeleteProps {
  defaultValue?: IBTSPeriod | null
  onConfirm?: (values?: IBTSPeriodFormData) => void
}
