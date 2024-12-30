import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IReportFilter } from '../interfaces'

export const initialStateReportFilter: IReportFilter = {
  CampusID: '',
  StartDate: '',
  EndDate: '',
  Topic: '',
}

export const allCampusOptions: IGeneralFetch = {
  id: '',
  label: 'Please Select',
}

export const allTopicOptions: IGeneralFetch = {
  id: '',
  label: 'All',
}
