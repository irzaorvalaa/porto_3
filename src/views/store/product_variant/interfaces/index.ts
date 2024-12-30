import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface IProductVariant extends IDefaultResponseBE {
  label: string
  isDigital: string
  type: string
}

export interface IProductVariantDetail extends IProductVariant {}

export declare interface IProductVariantResponse extends IDefaultResponse {
  data: IProductVariant[] | null
}

export declare interface IProductVariantDetailResponse extends IDefaultResponse {
  data: IProductVariantDetail | null
}

export interface IProductVariantState extends ILocalState {
  data: IProductVariant[]
}

export interface IProductVariantFormState extends ILocalState {
  data: IProductVariant | null
}

export interface IProductVariantDetailState extends ILocalState {
  data: IProductVariantDetail[]
}
