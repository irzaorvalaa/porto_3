import {
  IBookType,
  IBookTypeDetailState,
  IBookTypeFormState,
  IBookTypeState,
} from '../interfaces'

export const initialStateBookType: IBookTypeState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBookTypeDetail: IBookTypeDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBookTypeForm: IBookTypeFormState = {
  isLoading: false,
  data: null,
  error: '',
}