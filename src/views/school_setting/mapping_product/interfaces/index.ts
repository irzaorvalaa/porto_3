import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  IAcademicProgramAssignation,
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
  IRoleAssignation,
} from '../../../../interfaces/IResponse'

export interface IMappingProduct extends IDefaultResponseBE {
  label: string
  campusID: string
  campusName: string
  dayName: string
  dayOrder: string
  startTime: string
  endTime: string
}

export interface IMappingProductDetail extends IMappingProduct {}

export declare interface IMappingProductResponse extends IDefaultResponse {
  data: IMappingProduct[] | null
}

export declare interface IMappingProductDetailResponse extends IDefaultResponse {
  data: IMappingProductDetail | null
}

export interface IMappingProductState extends ILocalState {
  data: IMappingProduct[]
}

export interface IMappingProductFormState extends ILocalState {
  data: IMappingProduct | null
}

export interface IMappingProductDetailState extends ILocalState {
  data: IMappingProductDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
