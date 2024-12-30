import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'

export interface ITalkToUs {
  id: string
  appointmentDate: string
  timeSlot: string
  campus: string
  requestorName: string
  meetingUrl: string
  attendStatus: 'T' | 'F'
  appointmentStatus: string
  appointmentStatusDesc: string
  requestorStatus: string
  requestorStatusDesc: string
}

export interface ITalkToUsConfirm {
  FormID: string
  RequestorStatusID: string
}

export interface ITalkToUsResponse extends IDefaultResponse {
  data: ITalkToUs[]
}

export interface ITalkToUsState extends ILocalState {
  data: ITalkToUs[]
}

export declare interface ITalkToUsFormState extends ILocalState {
  data: ITalkToUsConfirm | null
}

export declare interface IDialogTalkToUsConfirm {
  confirm: boolean;
  reject: boolean;
}