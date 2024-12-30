import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'

export interface IReferenceServiceReportFilterProps {
  campusOptions?: IGeneralFetch[]
  topicOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IReferenceServiceReportFilter) => void
  onExport?: (filter: IReferenceServiceReportFilter) => void
  onCampusChange?: (campus: IGeneralFetch) => void
}

export interface IReferenceServiceReportFilter {
  CampusID?: string
  StartDate?: string
  EndDate?: string
  Topic?: string
}
