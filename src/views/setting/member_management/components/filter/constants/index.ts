import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IMemberManagementFilter } from '../interfaces'

export const initialStateMemberManagementFilter: IMemberManagementFilter = {
  campusID: '',
  showUser: '1',
  academicGroup: '',
  academicOrganization: '',
  academicProgram: '',
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}