import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IUserManagementFilterProps {
  campusOptions?: IGeneralFetch[]
  academicProgramOptions?: IGeneralFetch[]
  roleOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IUserManagementFilter) => void
}

export interface IUserManagementFilter {
  campusID?: string
  userType?: string
  academicProgram?: string
  roleID?: string
}
