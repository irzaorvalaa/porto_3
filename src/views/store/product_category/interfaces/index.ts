import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface IProductCategory extends IDefaultResponseBE {
  label: string
  topic: string
}

export interface IProductCategoryDetail extends IProductCategory {}

export declare interface IProductCategoryResponse extends IDefaultResponse {
  data: IProductCategory[] | null
}

export declare interface IProductCategoryDetailResponse extends IDefaultResponse {
  data: IProductCategoryDetail | null
}

export interface IProductCategoryState extends ILocalState {
  data: IProductCategory[]
}

export interface IProductCategoryFormState extends ILocalState {
  data: IProductCategory | null
}

export interface IProductCategoryDetailState extends ILocalState {
  data: IProductCategoryDetail[]
}
