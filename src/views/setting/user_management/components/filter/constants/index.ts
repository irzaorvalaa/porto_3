import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IUserManagementFilter } from '../interfaces'

export const initialStateUserManagementFilter: IUserManagementFilter = {
  campusID: '',
  userType: '',
  academicProgram: '',
  roleID: '',
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}
