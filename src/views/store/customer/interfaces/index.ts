import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface ICustomer extends IDefaultResponseBE {
  name: string
}

export interface ICustomerDetail extends ICustomer {}

export declare interface ICustomerResponse extends IDefaultResponse {
  data: ICustomer[] | null
}

export declare interface ICustomerDetailResponse extends IDefaultResponse {
  data: ICustomerDetail | null
}

export interface ICustomerState extends ILocalState {
  data: ICustomer[]
}

export interface ICustomerFormState extends ILocalState {
  data: ICustomer | null
}

export interface ICustomerDetailState extends ILocalState {
  data: ICustomerDetail[]
}
