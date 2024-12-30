import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IUserLoginReportFilter } from '../interfaces'

export const initialStateUserLoginReportFilter: IUserLoginReportFilter = {
  showUser: '1',
  academicGroup: '',
  academicOrganization: '',
  academicProgram: '',
  StartDate: '',
  EndDate: '',
  reportType: '1'
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}