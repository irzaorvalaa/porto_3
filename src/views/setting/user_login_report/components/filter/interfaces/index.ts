import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IUserLoginReportFilterProps {
  campusOptions?: IGeneralFetch[]
  academicGroupOptions?: IGeneralFetch[]
  academicOrganizationOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IUserLoginReportFilter) => void
  onExport?: (filter: IUserLoginReportFilter) => void
}

export interface IUserLoginReportFilter {
  LoginSource?: string
  campusID?: string
  showUser?: string
  academicGroup?: string
  academicOrganization?: string
  academicProgram?: string
  StartDate?: string
  EndDate?: string
  reportType?: string
}
