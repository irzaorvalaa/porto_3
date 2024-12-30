import {
  IBTSPeriod,
  IBTSPeriodDetailState,
  IBTSPeriodFormState,
  IBTSPeriodState,
  IFetchCampusStatus,
} from '../interfaces'

export const initialStateBTSPeriod: IBTSPeriodState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBTSPeriodDetail: IBTSPeriodDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBTSPeriodForm: IBTSPeriodFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}
