import { ApiBTSPeriod } from '../../../../constants/ApiBTSPeriod'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { IBTSPeriodFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IBTSPeriodDetailResponse, IBTSPeriodResponse } from '../interfaces'
import { IBTSPeriodFilter } from '../components/filter/interfaces'

const fetchBTSPeriod = async (signal: AbortSignal, filter?: IBTSPeriodFilter) => {
  return await httpService.get<IBTSPeriodResponse>({
    url: `${ApiBTSPeriod.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchBTSPeriodDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IBTSPeriodDetailResponse>({
    url: `${ApiBTSPeriod.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveBTSPeriod = async (data: IBTSPeriodFormData, signal: AbortSignal) => {
  return await httpService.post<IBTSPeriodResponse>({
    url: ApiBTSPeriod.save,
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

export { fetchBTSPeriod, saveBTSPeriod, fetchBTSPeriodDetail, fetchMasterCampus }
