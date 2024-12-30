import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IGuestBookExternalFilter } from '../interfaces'

export const initialStateGuestBookExternalFilter: IGuestBookExternalFilter = {
  campusID: '',
  startDate: '',
  endDate: '',
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}