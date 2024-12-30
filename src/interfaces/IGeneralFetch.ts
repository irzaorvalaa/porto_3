import { ILocalState } from './ILocalState'
import { IDefaultResponse } from './IResponse'

export interface IGeneralFetch {
  id: string
  label: string
}

export interface IGeneralFetchResponse extends IDefaultResponse {
  data: IGeneralFetch[]
}

export interface IGeneralFetchState extends ILocalState {
  data: IGeneralFetch[]
}
