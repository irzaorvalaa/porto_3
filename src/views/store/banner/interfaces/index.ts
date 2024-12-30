import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface IBanner extends IDefaultResponseBE {
  name: string
  scopeNote: string
  broaderTerm: string
  narrowerTerm: string
  usedFor: string
  relatedTerm: string
}

export interface IBannerDetail extends IBanner {}

export declare interface IBannerResponse extends IDefaultResponse {
  data: IBanner[] | null
}

export declare interface IBannerDetailResponse extends IDefaultResponse {
  data: IBannerDetail | null
}

export interface IBannerState extends ILocalState {
  data: IBanner[]
}

export interface IBannerFormState extends ILocalState {
  data: IBanner | null
}

export interface IBannerDetailState extends ILocalState {
  data: IBannerDetail[]
}
