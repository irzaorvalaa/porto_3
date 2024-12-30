import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { ICalendar, ICalendarDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface ICalendarFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  defaultValue?: ICalendarDetail | null
  onConfirm?: (values: ICalendarFormData) => void
}

export interface ICalendarFormData extends IFormDataDefault {
  label?: string
  effDateStart?: string
  effDateEnd?: string
  selAllCampus?: string
  campusID?: string[]
  campusName?: string[]
  campusList?: string
}
