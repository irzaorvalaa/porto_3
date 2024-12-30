import { IGeneralFetchState } from '../../../interfaces/IGeneralFetch'
import { IReferenceServiceReportState } from '../interfaces'

export const initialStateReferenceServiceReport: IReferenceServiceReportState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
