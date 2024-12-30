import { ICampusFormState, ICMSCampusState } from '../interfaces'

export const initialStateCampus: ICMSCampusState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateCampusForm: ICampusFormState = {
  isLoading: false,
  data: null,
  error: '',
}
