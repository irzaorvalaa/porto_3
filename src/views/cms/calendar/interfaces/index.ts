import { ILocalState } from '../../../../interfaces/ILocalState'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { ICampusAssignation, IDefaultResponse, IDefaultResponseBE } from '../../../../interfaces/IResponse'

export interface ICalendar extends IDefaultResponseBE {
  effDateStart: string
  effDateEnd: string
  label: string
  campusLocation: ICampusAssignation[]
}

export interface ICalendarDetail extends ICalendar {
}

export declare interface ICalendarResponse extends IDefaultResponse {
  data: ICalendar[] | null
}

export declare interface ICalendarDetailResponse extends IDefaultResponse {
  data: ICalendarDetail | null
}

export interface ICalendarState extends ILocalState {
  data: ICalendar[]
}

export interface ICalendarFormState extends ILocalState {
  data: ICalendar | null
}

export interface ICalendarDetailState extends ILocalState {
  data: ICalendarDetail[]
}

export interface IFetchCampusStatus extends ILocalState {
  data: IGeneralFetch[]
}
