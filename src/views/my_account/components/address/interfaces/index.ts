import { ILocalState } from '../../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../../interfaces/IResponse'

export interface IAddress extends IDefaultResponseBE {
  id: string
  name: string
  phoneNumber: any
  city: string
  state: string
  address: string
  postalCode: any
  title: string
  province: string
}

export interface IAddressDetail extends IAddress {}

export declare interface IAddressResponse extends IDefaultResponse {
  data: IAddress[] | null
}

export declare interface IAddressDetailResponse extends IDefaultResponse {
  data: IAddressDetail | null
}

export interface IAddressState extends ILocalState {
  data: IAddress[]
}

export interface IAddressFormState extends ILocalState {
  data: IAddress | null
}

export interface IAddressDetailState extends ILocalState {
  data: IAddressDetail[]
}
