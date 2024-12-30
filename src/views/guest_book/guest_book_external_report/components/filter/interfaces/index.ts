import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IGuestBookExternalReportFilterProps {
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IGuestBookExternalReportFilter) => void
  onExport?: (filter: IGuestBookExternalReportFilter) => void
}

export interface IGuestBookExternalReportFilter {
  CampusID?: string
  StartDate?: string
  EndDate?: string
}
