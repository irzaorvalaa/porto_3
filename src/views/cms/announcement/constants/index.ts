import {
  IAnnouncement,
  IAnnouncementDetailState,
  IAnnouncementFormState,
  IAnnouncementState,

  IFetchCampusStatus,
} from '../interfaces'

export const initialStateAnnouncement: IAnnouncementState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAnnouncementDetail: IAnnouncementDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAnnouncementForm: IAnnouncementFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}