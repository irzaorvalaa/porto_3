import { IGeneralFetchState } from '../../../../interfaces/IGeneralFetch'
import { IFetchAcademicGroupStatus, IFetchAcademicOrganizationStatus, IFetchAcademicProgramStatus, IGuestBookBinusianReportState } from '../interfaces'

export const initialStateGuestBookBinusianReport: IGuestBookBinusianReportState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}


export const initialStateAcademicProgram: IFetchAcademicProgramStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAcademicOrganization: IFetchAcademicOrganizationStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAcademicGroup: IFetchAcademicGroupStatus = {
  isLoading: false,
  data: [],
  error: '',
}