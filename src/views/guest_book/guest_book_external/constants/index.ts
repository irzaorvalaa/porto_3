import {
  IGuestBookExternal,
  IGuestBookExternalDetailState,
  IGuestBookExternalFormState,
  IGuestBookExternalState,

  IFetchCampusStatus,
} from '../interfaces'

export const initialStateGuestBookExternal: IGuestBookExternalState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateGuestBookExternalDetail: IGuestBookExternalDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateGuestBookExternalForm: IGuestBookExternalFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}
