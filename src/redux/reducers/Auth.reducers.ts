import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_AZURE_FETCH,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_VALIDATE_FETCH,
  AUTH_VALIDATE_SUCCESS,
} from '../../constants/AuthAction'
import { initialAuthState } from '../../constants/AuthState'
import { IAuthState, IAuthValidate } from '../../interfaces/IAuth'
import { IAuthAction } from '../../interfaces/IReduxAction'

export const AuthReducer = (
  state: IAuthState = initialAuthState,
  action: IAuthAction,
): IAuthState => {
  switch (action.type) {
    case AUTH_LOGIN_AZURE_FETCH:
      return authLoginFetch(state)

    case AUTH_LOGIN_SUCCESS:
      return authLoginSuccess(state, action.data as string)

    case AUTH_LOGIN_FAILED:
      return authLoginFailed(state, action.data)

    case AUTH_VALIDATE_FETCH:
      return authValidateFetch(state)

    case AUTH_VALIDATE_SUCCESS:
      return authValidateSuccess(state, action.data as IAuthValidate)

    case AUTH_LOGOUT:
      return {
        ...state,
        ...initialAuthState,
      }

    default:
      return state
  }
}

const authLoginFetch = (state: IAuthState): IAuthState => {
  return {
    ...state,
    isLoading: true,
    error: null,
  }
}

const authLoginSuccess = (state: IAuthState, data: string): IAuthState => {
  return {
    ...state,
    isLoading: false,
    token: data,
  }
}

const authLoginFailed = (state: IAuthState, data: any): IAuthState => {
  return {
    ...state,
    isLoading: false,
    isValidating: false,
    error: data,
  }
}

const authValidateFetch = (state: IAuthState): IAuthState => {
  return {
    ...state,
    isValidating: true,
  }
}

const authValidateSuccess = (state: IAuthState, data: IAuthValidate): IAuthState => {
  return {
    ...state,
    isValidating: false,
    isLoggedIn: true,
    user: data,
  }
}
