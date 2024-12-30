import { ICampus } from '../../../interfaces/ICampus'
import { IHomeAnnouncementState, IHomeBannerState, IHomeNewsEventState } from '../interfaces'

export const initialHomeBannerState: IHomeBannerState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialHomeAnnouncementState: IHomeAnnouncementState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialHomeNewsEventState: IHomeNewsEventState = {
  isLoading: false,
  data: [],
  error: '',
}