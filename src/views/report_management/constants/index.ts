import { IGeneralFetchState } from '../../../interfaces/IGeneralFetch'
import { IReportState } from '../interfaces'

export const initialStateReport: IReportState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
