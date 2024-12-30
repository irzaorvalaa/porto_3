import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IReferenceServiceReportFilter } from '../interfaces'

export const initialStateReferenceServiceReportFilter: IReferenceServiceReportFilter = {
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
