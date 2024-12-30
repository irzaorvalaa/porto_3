import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ICampusAssignation, IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface INews extends IDefaultResponseBE {
  date: string
  title: string
  category: string
  author: string
  campusLocation: ICampusAssignation[]
}

export interface INewsDetail extends INews {
  isEvent: string
  photoUrl: string
  caption: string
  description: string
}

export declare interface INewsResponse extends IDefaultResponse {
  data: INews[] | null
}

export declare interface INewsDetailResponse extends IDefaultResponse {
  data: INewsDetail | null
}

export interface INewsState extends ILocalState {
  data: INews[]
}

export interface INewsFormState extends ILocalState {
  data: INews | null
}

export interface INewsDetailState extends ILocalState {
  data: INewsDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
