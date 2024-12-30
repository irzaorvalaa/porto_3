import { ICampusDetailState, ICampusState } from '../interfaces/ICampus'

export const initialCampusState: ICampusState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialCampusDetailState: ICampusDetailState = {
  isLoading: false,
  data: null,
  error: '',
}
