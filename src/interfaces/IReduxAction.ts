import { IAuthValidate } from './IAuth'

export declare interface IDefaultAction<T = any> {
  type: string
  data?: T
}

export declare interface IAuthAction extends IDefaultAction {
  data: string | IAuthValidate
}

export interface ITalkToUsAction {
  type: string
}
