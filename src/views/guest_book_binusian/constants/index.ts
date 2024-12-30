import { IGeneralFetchState } from '../../../interfaces/IGeneralFetch'
import { IGuestBookBinusianCampusState, IGuestBookBinusianFormState, IGuestBookCampusListState } from '../interfaces'

export const initialStateGuestBookBinusianForm: IGuestBookBinusianFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateGuestBookBinusianCampus: IGuestBookBinusianCampusState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampusOptions: IGuestBookCampusListState = {
  isLoading: false,
  data: [],
  error: '',
}
