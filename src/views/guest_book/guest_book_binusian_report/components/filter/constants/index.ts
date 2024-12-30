import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IGuestBookBinusianReportFilter } from '../interfaces'

export const initialStateGuestBookBinusianReportFilter: IGuestBookBinusianReportFilter = {
  campusID: '',
  StartDate: '',
  EndDate: '',
  showUser: '1',
  academicGroup: '',
  academicOrganization: '',
  academicProgram: '',
}

export const pSelOptions: IGeneralFetch = {
  id: '',
  label: 'Please Select',
}
