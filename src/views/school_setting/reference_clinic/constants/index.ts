import { IGeneralFetchState } from '../../../../interfaces/IGeneralFetch'
import {
  IReferenceClinicDetailState,
  IReferenceClinicFormState,
  IReferenceClinicState,
} from '../interfaces'

export const initialStateReferenceClinic: IReferenceClinicState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateReferenceClinicForm: IReferenceClinicFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateReferenceClinicDetail: IReferenceClinicDetailState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
