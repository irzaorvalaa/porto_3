import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { RootState } from '../bootstrap/App.reducers'
import { Store } from '../bootstrap/App.store'
import { internetConnectionProblem, resTimeoutError } from '../constants/ErrorMessage'
import { RES_TIMEOUT } from '../constants/Parameter'
import { IAuthState } from '../interfaces/IAuth'
import {
  IGetRequestConfigProps,
  IHttpService,
  IMethodProps,
  IMethodWithDataProps,
} from '../interfaces/IHttpConfig'

const getRequestConfig = ({
  data,
  method,
  headers,
  options,
  urlType,
}: IGetRequestConfigProps): AxiosRequestConfig => {
  let requestHeaders: AxiosRequestHeaders = {
    'Content-Type': 'application/json; charset=utf8',
  }

  if (headers) requestHeaders = { ...requestHeaders, ...headers }

  let requestConfig: AxiosRequestConfig = {
    baseURL: urlType == 'BE' ? process.env.REACT_APP_API_BE_URL : process.env.REACT_APP_API_URL,
    method,
    data,
    headers: requestHeaders,
    timeout: RES_TIMEOUT,
    timeoutErrorMessage: resTimeoutError,
    validateStatus: (status) => status >= 200 && status <= 299,
  }

  if (options) requestConfig = { ...requestConfig, ...options }

  return requestConfig
}

const getAuthenticatedHeader = (): AxiosRequestHeaders => {
  const state: RootState = Store.getState()
  const auth: IAuthState = state.auth

  const requestHeaders: AxiosRequestHeaders = {
    Authorization: '',
  }

  if (auth.token) {
    requestHeaders.Authorization = `Bearer ${auth.token}`
  }

  return requestHeaders
}

const getSignedRequestOptions = ({
  data,
  method,
  headers,
  options,
  urlType,
}: IGetRequestConfigProps): AxiosRequestConfig => {
  let requestHeaders: AxiosRequestHeaders = getAuthenticatedHeader()

  if (headers) requestHeaders = { ...requestHeaders, ...headers }

  const requestConfig: AxiosRequestConfig = getRequestConfig({
    data,
    method,
    headers: requestHeaders,
    options,
    urlType,
  })

  return requestConfig
}

const doFetch = async (url: string, requestConfig?: AxiosRequestConfig) => {
  if (!window.navigator.onLine) throw new Error(internetConnectionProblem)

  return axios(url, requestConfig)
    .then((res) => {
      return res
    })
    .catch((err) => {
      // here all status < 200 && status >= 300 handled
      // here is info about http status code: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      let errorMessage = err.response && err.response.data ? err.response.data : err.message
      errorMessage = errorMessage || JSON.stringify(err)

      if (typeof errorMessage !== 'string') {
        // errorMessage = JSON.stringify(errorMessage)
        errorMessage = errorMessage.errorMessage
      }

      // custom message if request timeout. In order to make the message more user friendly
      if (err.code === 'ECONNABORTED') errorMessage = resTimeoutError

      throw errorMessage
    })
}

const httpService: IHttpService = {
  get: <T = any>({ url, headers, options, urlType }: IMethodProps): Promise<AxiosResponse<T>> => {
    const requestConfig = getSignedRequestOptions({
      method: 'GET',
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  post: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps): Promise<AxiosResponse<T>> => {
    const requestConfig = getSignedRequestOptions({
      method: 'POST',
      data,
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  put: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps): Promise<AxiosResponse<T>> => {
    const requestConfig = getSignedRequestOptions({
      method: 'PUT',
      data,
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  delete: <T = any>({ url, headers, options, urlType }: IMethodProps): Promise<AxiosResponse<T, any>> => {
    const requestConfig = getSignedRequestOptions({
      method: 'DELETE',
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  xget: <T = any>({ url, headers, options, urlType }: IMethodProps): Promise<AxiosResponse<T, any>> => {
    const requestConfig = getRequestConfig({
      method: 'GET',
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  xpost: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps): Promise<AxiosResponse<T, any>> => {
    const requestConfig = getRequestConfig({
      method: 'POST',
      data,
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  xput: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps): Promise<AxiosResponse<T, any>> => {
    const requestConfig = getRequestConfig({
      method: 'PUT',
      data,
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
  xdelete: <T = any>({ url, headers, options, urlType }: IMethodProps): Promise<AxiosResponse<T, any>> => {
    const requestConfig = getRequestConfig({
      method: 'DELETE',
      headers,
      options,
      urlType,
    })

    return doFetch(url, requestConfig)
  },
}

export default httpService
