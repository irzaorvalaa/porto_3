import { ILocalState, ILocalStateAction } from '../interfaces/ILocalState'

export const useLocalState = <T = any>() => {
  const reducer = (state: ILocalState<T>, action: ILocalStateAction<T>) => {
    switch (action.type) {
      case 'request':
        return {
          ...state,
          isLoading: true,
          error: '',
        }
      case 'success':
        return {
          ...state,
          isLoading: false,
          data: action.data,
        }
      case 'failure':
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      default:
        return state
    }
  }

  return { reducer }
}
