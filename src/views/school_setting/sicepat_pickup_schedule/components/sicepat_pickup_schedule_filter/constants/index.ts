import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { ISicepatPickupFilter } from '../interfaces'

export const initialStateSicepatPickupFilter: ISicepatPickupFilter = {
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
