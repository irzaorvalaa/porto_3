import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface ISicepatPickupFilterProps {
  campusOptions?: IGeneralFetch[]
  topicOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: ISicepatPickupFilter) => void
  onExport?: (filter: ISicepatPickupFilter) => void
  onCampusChange?: (campus: IGeneralFetch) => void
}

export interface ISicepatPickupFilter {
  CampusID?: string
  StartDate?: string
  EndDate?: string
  Topic?: string
}
