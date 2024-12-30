import { ICollectionDetailState, ICollectionState } from '../interfaces/ICollection'

export const initialCollectionState: ICollectionState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialCollectionDetailState: ICollectionDetailState = {
  isLoading: false,
  data: null,
  error: '',
}
