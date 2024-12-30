import { IMerchant, IMerchantDetailState, IMerchantFormState, IMerchantState } from '../interfaces'

export const initialStateMerchant: IMerchantState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMerchantDetail: IMerchantDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMerchantForm: IMerchantFormState = {
  isLoading: false,
  data: null,
  error: '',
}
