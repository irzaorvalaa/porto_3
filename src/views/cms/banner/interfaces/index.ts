import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ICampusAssignation, IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface IBanner extends IDefaultResponseBE {
  headline: string
  effDateStart: string
  effDateEnd: string
  externalUrl: string
  sequenceNo: number
  status: string
}

export interface IBannerDetail extends IBanner {
  photoUrl: string
  caption: string
}

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

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
