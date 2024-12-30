import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ICampusAssignation, IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface IBookType extends IDefaultResponseBE {
  label: string
}

export interface IBookTypeDetail extends IBookType {
}

export declare interface IBookTypeResponse extends IDefaultResponse {
  data: IBookType[] | null
}

export declare interface IBookTypeDetailResponse extends IDefaultResponse {
  data: IBookTypeDetail | null
}

export interface IBookTypeState extends ILocalState {
  data: IBookType[]
}

export interface IBookTypeFormState extends ILocalState {
  data: IBookType | null
}

export interface IBookTypeDetailState extends ILocalState {
  data: IBookTypeDetail[]
}