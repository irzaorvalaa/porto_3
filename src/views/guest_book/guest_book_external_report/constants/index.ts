import { IGeneralFetchState } from '../../../../interfaces/IGeneralFetch'
import { IGuestBookExternalReportState } from '../interfaces'

export const initialStateGuestBookExternalReport: IGuestBookExternalReportState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
