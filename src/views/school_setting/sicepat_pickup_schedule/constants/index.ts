import { IGeneralFetchState } from '../../../../interfaces/IGeneralFetch'
import { ISicepatPickupState } from '../interfaces'

export const initialStateSicepatPickup: ISicepatPickupState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateFetchOptions: IGeneralFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
