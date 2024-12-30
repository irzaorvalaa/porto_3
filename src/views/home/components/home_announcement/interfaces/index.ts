import { ICampus } from '../../../../../interfaces/ICampus'
import { ILocalState } from '../../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../../interfaces/IResponse'

export interface IHomeAnnouncementProps {
  data?: IHomeAnnouncement[]
  dataCampus?: ICampus[]
  loading?: boolean
  loadingCampus?: boolean
  onChangeCampus?: (campus: ICampus) => void
}

export interface IHomeAnnouncement {
  id: string
  announcementImgUrl: string
  title: string
  effDateStart: string
}

export interface IAnnouncementDetail extends IHomeAnnouncement {
  description: string
}

export interface IAnnouncementDetailResponse extends IDefaultResponse {
  data: IAnnouncementDetail | null
}

export interface IAnnouncementDetailState extends ILocalState {
  data: IAnnouncementDetail | null
}
