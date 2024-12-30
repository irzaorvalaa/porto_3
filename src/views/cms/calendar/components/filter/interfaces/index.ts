import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface ICalendarFilterProps {
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: ICalendarFilter) => void
}

export interface ICalendarFilter {
  campusID?: string
}
