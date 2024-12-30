import { ApiBanner } from '../../../../constants/ApiBanner'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { IBannerFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IBannerDetailResponse,
  IBannerResponse,
} from '../interfaces'
import { IBannerFilter } from '../components/filter/interfaces'

const fetchBanner = async (signal: AbortSignal, filter?: IBannerFilter) => {
  return await httpService.get<IBannerResponse>({
    url: `${ApiBanner.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchBannerDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IBannerDetailResponse>({
    url: `${ApiBanner.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveBanner = async (data: IBannerFormData, signal: AbortSignal) => {
  return await httpService.post<IBannerResponse>({
    url: ApiBanner.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export {
  fetchBanner,
  saveBanner,
  fetchBannerDetail,
}
