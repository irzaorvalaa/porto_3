import { ICampus } from '../../../../../interfaces/ICampus'
import { ILocalState } from '../../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../../interfaces/IResponse'

export interface IHomeNewsEventProps {
  data?: IHomeNewsEvent[]
  dataCampus?: ICampus[]
  loading?: boolean
  loadingCampus?: boolean
  onChangeCampus?: (campus: ICampus) => void
}

export interface IHomeNewsEvent {
  id: string
  newsImgUrl: string
  title: string
  isEvent: boolean
  caption: string
  publishDate: string
}

export interface INewsEventDetail extends IHomeNewsEvent {
  author: string
  description: string
}

export interface INewsEventDetailResponse extends IDefaultResponse {
  data: INewsEventDetail | null
}

export interface INewsEventDetailState extends ILocalState {
  data: INewsEventDetail | null
}
