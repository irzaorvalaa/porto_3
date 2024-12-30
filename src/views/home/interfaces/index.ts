import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'
import { IHomeAnnouncement } from '../components/home_announcement/interfaces'
import { IHomeNewsEvent } from '../components/home_news_event/interfaces'

export interface IHomeBanner {
  id: string
  bannerImgUrl: string
  headline: string
  caption: string
  externalUrl: string
  sequenceNo: number
}

export interface IHomeBannerResponse extends IDefaultResponse {
  data: IHomeBanner[]
}

export interface IHomeBannerState extends ILocalState {
  data: IHomeBanner[]
}

export interface IHomeAnnouncementResponse extends IDefaultResponse {
  data: IHomeAnnouncement[]
}

export interface IHomeAnnouncementState extends ILocalState {
  data: IHomeAnnouncement[]
}

export interface IHomeNewsEventResponse extends IDefaultResponse {
  data: IHomeNewsEvent[]
}

export interface IHomeNewsEventState extends ILocalState {
  data: IHomeNewsEvent[]
}
