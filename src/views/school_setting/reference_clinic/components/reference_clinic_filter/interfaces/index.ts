import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IReferenceClinicFilterProps {
  campusOptions?: IGeneralFetch[]
  topicOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IReferenceClinicFilter) => void
  onCampusChange?: (campus: IGeneralFetch) => void
}

export interface IReferenceClinicFilter {
  CampusID?: string
  StartDate?: string
  EndDate?: string
  Topic?: string
}
