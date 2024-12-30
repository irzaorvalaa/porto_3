import {
  ICalendar,
  ICalendarDetailState,
  ICalendarFormState,
  ICalendarState,

  IFetchCampusStatus,
} from '../interfaces'

export const initialStateCalendar: ICalendarState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateCalendarDetail: ICalendarDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateCalendarForm: ICalendarFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}