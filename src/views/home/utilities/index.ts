import { ApiFE } from '../../../constants/ApiFE'
import { ICampusResponse } from '../../../interfaces/ICampus'
import { ICollectionResponse } from '../../../interfaces/ICollection'
import httpService from '../../../utilities/httpService'
import {
  IHomeAnnouncementResponse,
  IHomeBannerResponse,
  IHomeNewsEventResponse,
} from '../interfaces'

export const fetchBanner = async (signal: AbortSignal) => {
  return await httpService.get<IHomeBannerResponse>({
    url: ApiFE.getBanner,
    options: {
      signal,
    },
  })
}

export const fetchCollection = async (signal: AbortSignal) => {
  return await httpService.get<ICollectionResponse>({
    url: ApiFE.getCollection,
    options: {
      signal,
    },
  })
}

export const fetchCampus = async (signal: AbortSignal) => {
  return await httpService.get<ICampusResponse>({
    url: ApiFE.getCampus,
    options: {
      signal,
    },
  })
}

export const fetchAnnouncement = async (campusID: string, signal: AbortSignal) => {
  return await httpService.get<IHomeAnnouncementResponse>({
    url: ApiFE.getAnnouncement,
    options: {
      signal,
      params: {
        CampusID: campusID,
      },
    },
  })
}

export const fetchNews = async (campusID: string, signal: AbortSignal) => {
  return await httpService.get<IHomeNewsEventResponse>({
    url: ApiFE.getNews,
    options: {
      signal,
      params: {
        CampusID: campusID,
      },
    },
  })
}
