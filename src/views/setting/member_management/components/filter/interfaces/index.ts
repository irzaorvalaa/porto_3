import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IMemberManagementFilterProps {
  campusOptions?: IGeneralFetch[]
  academicGroupOptions?: IGeneralFetch[]
  academicOrganizationOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IMemberManagementFilter) => void
}

export interface IMemberManagementFilter {
  campusID?: string
  showUser?: string
  academicGroup?: string
  academicOrganization?: string
  academicProgram?: string
}
