import { IAddress, IAddressDetailState, IAddressFormState, IAddressState } from '../interfaces'

export const initialStateAddress: IAddressState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAddressDetail: IAddressDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAddressForm: IAddressFormState = {
  isLoading: false,
  data: null,
  error: '',
}
