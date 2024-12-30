import { IBECampus, IBECampusDetail } from '../../../../interfaces/ICampus'
import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface ICMSCampusResponse extends IDefaultResponse {
  data: IBECampus[]
}

export interface ICMSCampusDetailResponse extends IDefaultResponse {
  data: IBECampusDetail
}

export interface ICMSCampusState extends ILocalState {
  data: IBECampus[]
}

export declare interface ICampusFormState extends ILocalState {
  data: IBECampus | null
}
