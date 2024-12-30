import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { ICalendarFilter } from '../interfaces'

export const initialStateCalendarFilter: ICalendarFilter = {
  campusID: '',
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}