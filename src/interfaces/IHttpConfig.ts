import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'

export declare interface IGetRequestConfigProps {
  method: Method
  data?: any
  headers?: AxiosRequestHeaders | undefined
  options?: AxiosRequestConfig | undefined
  urlType?: string
}

export declare interface IMethodProps {
  url: string
  headers?: AxiosRequestHeaders | undefined
  options?: AxiosRequestConfig | undefined
  urlType?: string
}

export declare interface IMethodWithDataProps extends IMethodProps {
  data: any
}

export declare interface IHttpService {
  // Authenticated Method
  get: <T = any>({ url, headers, options, urlType }: IMethodProps) => Promise<AxiosResponse<T>>
  post: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps) => Promise<AxiosResponse<T>>
  put: <T = any>({ url, data, headers, options, urlType }: IMethodWithDataProps) => Promise<AxiosResponse<T>>
  delete: <T = any>({ url, headers, options, urlType }: IMethodProps) => Promise<AxiosResponse<T>>
  
  // Unauthenticated Method
  xget: <T = any>({ url, headers, options, urlType }: IMethodProps) => Promise<AxiosResponse<T>>
  xpost: <T = any>({
    url,
    data,
    headers,
    options,
    urlType,
  }: IMethodWithDataProps) => Promise<AxiosResponse<T>>
  xput: <T = any>({ url, data, headers, options, urlType }: IMethodWithDataProps) => Promise<AxiosResponse<T>>
  xdelete: <T = any>({ url, headers, options, urlType }: IMethodProps) => Promise<AxiosResponse<T>>
}
