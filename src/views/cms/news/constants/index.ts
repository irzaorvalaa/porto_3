import {
  INews,
  INewsDetailState,
  INewsFormState,
  INewsState,

  IFetchCampusStatus,
} from '../interfaces'

export const initialStateNews: INewsState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateNewsDetail: INewsDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateNewsForm: INewsFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}