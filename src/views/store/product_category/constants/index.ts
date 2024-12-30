import {
  IProductCategory,
  IProductCategoryDetailState,
  IProductCategoryFormState,
  IProductCategoryState,
} from '../interfaces'

export const initialStateProductCategory: IProductCategoryState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductCategoryDetail: IProductCategoryDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateProductCategoryForm: IProductCategoryFormState = {
  isLoading: false,
  data: null,
  error: '',
}
