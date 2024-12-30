import { ApiAnnouncement } from '../../../../constants/ApiAnnouncement'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { IAnnouncementFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IAnnouncementDetailResponse,
  IAnnouncementResponse,
} from '../interfaces'
import { IAnnouncementFilter } from '../components/filter/interfaces'

const fetchAnnouncement = async (signal: AbortSignal, filter?: IAnnouncementFilter) => {
  return await httpService.get<IAnnouncementResponse>({
    url: `${ApiAnnouncement.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchAnnouncementDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IAnnouncementDetailResponse>({
    url: `${ApiAnnouncement.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveAnnouncement = async (data: IAnnouncementFormData, signal: AbortSignal) => {
  return await httpService.post<IAnnouncementResponse>({
    url: ApiAnnouncement.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

const fetchMasterCampus = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCampus.fetch,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

export {
  fetchAnnouncement,
  saveAnnouncement,
  fetchAnnouncementDetail,
  fetchMasterCampus,
}
