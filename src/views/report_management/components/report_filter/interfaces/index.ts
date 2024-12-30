import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'

export interface IReportFilterProps {
  campusOptions?: IGeneralFetch[]
  topicOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IReportFilter) => void
  onExport?: (filter: IReportFilter) => void
  onCampusChange?: (campus: IGeneralFetch) => void
}

export interface IReportFilter {
  CampusID?: string
  StartDate?: string
  EndDate?: string
  Topic?: string
}
