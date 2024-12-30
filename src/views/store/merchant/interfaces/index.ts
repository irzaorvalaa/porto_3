import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import {
  ICampusAssignation,
  IDefaultResponse,
  IDefaultResponseBE,
} from '../../../../interfaces/IResponse'

export interface IMerchant extends IDefaultResponseBE {
  name: string
  city: string
  phoneNumber: string
  email: string
}

export interface IMerchantDetail extends IMerchant {
  address: string
  sharedUsername: string
  sharedPassword: string
}

export declare interface IMerchantResponse extends IDefaultResponse {
  data: IMerchant[] | null
}

export declare interface IMerchantDetailResponse extends IDefaultResponse {
  data: IMerchantDetail | null
}

export interface IMerchantState extends ILocalState {
  data: IMerchant[]
}

export interface IMerchantFormState extends ILocalState {
  data: IMerchant | null
}

export interface IMerchantDetailState extends ILocalState {
  data: IMerchantDetail[]
}
