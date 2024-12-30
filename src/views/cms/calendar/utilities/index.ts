import { ApiCalendar } from '../../../../constants/ApiCalendar'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { ICalendarFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  ICalendarDetailResponse,
  ICalendarResponse,
} from '../interfaces'
import { ICalendarFilter } from '../components/filter/interfaces'

const fetchCalendar = async (signal: AbortSignal, filter?: ICalendarFilter) => {
  return await httpService.get<ICalendarResponse>({
    url: `${ApiCalendar.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchCalendarDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<ICalendarDetailResponse>({
    url: `${ApiCalendar.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveCalendar = async (data: ICalendarFormData, signal: AbortSignal) => {
  return await httpService.post<ICalendarResponse>({
    url: ApiCalendar.save,
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
  fetchCalendar,
  saveCalendar,
  fetchCalendarDetail,
  fetchMasterCampus,
}
