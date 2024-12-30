import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_AZURE_FETCH,
  AUTH_LOGIN_VENDOR_FETCH,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_VALIDATE_FETCH,
  AUTH_VALIDATE_SUCCESS,
} from '../../constants/AuthAction'
import {
  IAuthLoginAzureRequest,
  IAuthLoginCallback,
  IAuthLoginVendorRequest,
  IAuthValidate,
} from '../../interfaces/IAuth'

export const authLoginAzureFetch = (data: IAuthLoginAzureRequest, callback: IAuthLoginCallback) => ({
  type: AUTH_LOGIN_AZURE_FETCH,
  data,
  callback,
})
export const authLoginVendorFetch = (data: IAuthLoginVendorRequest, callback: IAuthLoginCallback) => ({
  type: AUTH_LOGIN_VENDOR_FETCH,
  data,
  callback,
})
export const authLoginSuccess = (data: string) => ({ type: AUTH_LOGIN_SUCCESS, data })
export const authLoginFailed = (data: any) => ({ type: AUTH_LOGIN_FAILED, data })

export const authValidateFetch = () => ({ type: AUTH_VALIDATE_FETCH })
export const authValidateSuccess = (data: IAuthValidate) => ({ type: AUTH_VALIDATE_SUCCESS, data })

export const authLogout = () => ({ type: AUTH_LOGOUT })
