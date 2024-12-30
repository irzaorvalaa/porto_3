import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { ApiAuth } from '../../constants/ApiAuth'
import { AUTH_LOGIN_AZURE_FETCH, AUTH_LOGIN_VENDOR_FETCH } from '../../constants/AuthAction'
import {
  IAuthLoginAzureRequest,
  IAuthLoginCallback,
  IAuthLoginVendorRequest,
  IAuthLoginResponse,
  IAuthValidate,
  IAuthValidateResponse,
} from '../../interfaces/IAuth'
import httpService from '../../utilities/httpService'
import {
  authLoginFailed,
  authLoginSuccess,
  authValidateFetch,
  authValidateSuccess,
} from '../actions/Auth.actions'

function* fetchAuthAzure({ data }: { type: string; data: IAuthLoginAzureRequest }) {
  try {
    const response: AxiosResponse<IAuthLoginResponse> = yield call(httpService.xpost, {
      url: ApiAuth.loginAzure,
      urlType: 'BE',
      data,
    })

    const { data: token, resultCode, errorMessage } = response.data

    if (resultCode === 0) throw errorMessage

    yield put(authValidateFetch())

    const responseValidate: AxiosResponse<IAuthValidateResponse> = yield call(httpService.get, {
      url: ApiAuth.validate,
      urlType: 'BE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const {
      data: validateData,
      resultCode: validateResultCode,
      errorMessage: validateErrorMessage,
    } = responseValidate.data

    if (validateResultCode === 0) throw validateErrorMessage

    yield put(authLoginSuccess(token))

    yield put(authValidateSuccess(validateData as IAuthValidate))
  } catch (err) {
    yield put(authLoginFailed(err))
  }
}

function* fetchAuthVendor({
  data,
  callback: cb,
}: {
  type: string
  data: IAuthLoginVendorRequest
  callback: IAuthLoginCallback
}) {
  try {
    const response: AxiosResponse<IAuthLoginResponse> = yield call(httpService.xpost, {
      url: ApiAuth.loginVendor,
      urlType: 'BE',
      data,
    })

    const { data: token, resultCode, errorMessage } = response.data

    if (resultCode === 0) throw errorMessage

    yield put(authValidateFetch())

    const responseValidate: AxiosResponse<IAuthValidateResponse> = yield call(httpService.get, {
      url: ApiAuth.validate,
      urlType: 'BE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const {
      data: validateData,
      resultCode: validateResultCode,
      errorMessage: validateErrorMessage,
    } = responseValidate.data

    if (validateResultCode === 0) throw validateErrorMessage

    yield put(authLoginSuccess(token))

    yield put(authValidateSuccess(validateData as IAuthValidate))

    cb(validateData as IAuthValidate)
  } catch (err) {
    yield put(authLoginFailed(err))

    cb(null, err)
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_LOGIN_AZURE_FETCH, fetchAuthAzure)
  yield takeLatest(AUTH_LOGIN_VENDOR_FETCH, fetchAuthVendor)
}
