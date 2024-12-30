import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { ICalendar } from '../../../interfaces'
import { ICalendarFormData } from '../../form/interfaces'

export declare interface ICalendarDeleteProps extends IDialogDeleteProps {
  defaultValue?: ICalendar | null
  onConfirm?: (values?: ICalendarFormData) => void
}
