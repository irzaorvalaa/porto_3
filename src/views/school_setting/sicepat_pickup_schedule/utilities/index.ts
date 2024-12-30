import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiReferenceService } from '../../../../constants/ApiReferenceService'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import httpService from '../../../../utilities/httpService'
import { ISicepatPickupFilter } from '../components/sicepat_pickup_schedule_filter/interfaces'
import { ISicepatPickupResponse } from '../interfaces'

export const getReport = async (signal: AbortSignal, filter?: ISicepatPickupFilter) => {
  return await httpService.get<ISicepatPickupResponse>({
    url: ApiReferenceService.getReport,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}

export const fetchCampus = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCampus.fetch,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const fetchTopic = async (campusId: string, signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: `${ApiReferenceService.fetchTopic}/${campusId}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const exportExcel = async (signal: AbortSignal, filter?: ISicepatPickupFilter) => {
  return await httpService.get<any>({
    url: ApiReferenceService.exportExcel,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}
