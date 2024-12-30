import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IGuestBookBinusianReportFilterProps {
  campusOptions?: IGeneralFetch[]
  academicGroupOptions?: IGeneralFetch[]
  academicOrganizationOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IGuestBookBinusianReportFilter) => void
  onExport?: (filter: IGuestBookBinusianReportFilter) => void
}

export interface IGuestBookBinusianReportFilter {
  campusID?: string
  showUser?: string
  academicGroup?: string
  academicOrganization?: string
  academicProgram?: string
  StartDate?: string
  EndDate?: string
}
