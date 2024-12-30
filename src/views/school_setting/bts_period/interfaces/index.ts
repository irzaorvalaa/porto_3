import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface IBTSPeriod extends IDefaultResponseBE {
  label: string
  campusLocation: ICampusAssignation[]
}

export interface IBTSPeriodDetail extends IBTSPeriod {}

export declare interface IBTSPeriodResponse extends IDefaultResponse {
  data: IBTSPeriod[] | null
}

export declare interface IBTSPeriodDetailResponse extends IDefaultResponse {
  data: IBTSPeriodDetail | null
}

export interface IBTSPeriodState extends ILocalState {
  data: IBTSPeriod[]
}

export interface IBTSPeriodFormState extends ILocalState {
  data: IBTSPeriod | null
}

export interface IBTSPeriodDetailState extends ILocalState {
  data: IBTSPeriodDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
