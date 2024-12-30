import {
  IProductVariant,
  IProductVariantDetailState,
  IProductVariantFormState,
  IProductVariantState,
} from '../interfaces'

export const initialStateProductVariant: IProductVariantState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductVariantDetail: IProductVariantDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductVariantForm: IProductVariantFormState = {
  isLoading: false,
  data: null,
  error: '',
}
