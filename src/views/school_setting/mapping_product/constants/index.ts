import {
  IMappingProduct,
  IMappingProductDetailState,
  IMappingProductFormState,
  IMappingProductState,
  IFetchCampusStatus,
} from '../interfaces'

export const initialStateMappingProduct: IMappingProductState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMappingProductDetail: IMappingProductDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMappingProductForm: IMappingProductFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}
