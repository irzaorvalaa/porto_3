import { ICustomer, ICustomerDetailState, ICustomerFormState, ICustomerState } from '../interfaces'

export const initialStateCustomer: ICustomerState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateCustomerDetail: ICustomerDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateCustomerForm: ICustomerFormState = {
  isLoading: false,
  data: null,
  error: '',
}
