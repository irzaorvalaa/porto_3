import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ICampusAssignation, IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface IAnnouncement extends IDefaultResponseBE {
  title: string
  effDateStart: string
  effDateEnd: string
  campusLocation: ICampusAssignation[]
}

export interface IAnnouncementDetail extends IAnnouncement {
  photoUrl: string
  description: string
}

export declare interface IAnnouncementResponse extends IDefaultResponse {
  data: IAnnouncement[] | null
}

export declare interface IAnnouncementDetailResponse extends IDefaultResponse {
  data: IAnnouncementDetail | null
}

export interface IAnnouncementState extends ILocalState {
  data: IAnnouncement[]
}

export interface IAnnouncementFormState extends ILocalState {
  data: IAnnouncement | null
}

export interface IAnnouncementDetailState extends ILocalState {
  data: IAnnouncementDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
