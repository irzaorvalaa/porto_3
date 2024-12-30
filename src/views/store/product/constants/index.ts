import {
  IProductDDCState,
  IProductDetailState,
  IProductFormState,
  IProductPublisherState,
  IProductState,
} from '../interfaces'
import { IGeneralFetchState } from '../../../../interfaces/IGeneralFetch'

export const initialStateProduct: IProductState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductDetail: IProductDetailState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateProductForm: IProductFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductDDC: IProductDDCState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductPublisher: IProductPublisherState = {
  isLoading: false,
  data: [],
  error: '',
}
