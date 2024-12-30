import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IReferenceClinicFilter } from '../interfaces'

export const initialStateReferenceClinicFilter: IReferenceClinicFilter = {
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
