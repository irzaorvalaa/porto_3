import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IGuestBookExternalReportFilter } from '../interfaces'

export const initialStateGuestBookExternalReportFilter: IGuestBookExternalReportFilter = {
  CampusID: '',
  StartDate: '',
  EndDate: '',
}

export const allCampusOptions: IGeneralFetch = {
  id: '',
  label: 'Please Select',
}
