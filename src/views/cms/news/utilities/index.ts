import { ApiNews } from '../../../../constants/ApiNews'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { INewsFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  INewsDetailResponse,
  INewsResponse,
} from '../interfaces'
import { INewsFilter } from '../components/filter/interfaces'

const fetchNews = async (signal: AbortSignal, filter?: INewsFilter) => {
  return await httpService.get<INewsResponse>({
    url: `${ApiNews.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchNewsDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<INewsDetailResponse>({
    url: `${ApiNews.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveNews = async (data: INewsFormData, signal: AbortSignal) => {
  return await httpService.post<INewsResponse>({
    url: ApiNews.save,
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
  fetchNews,
  saveNews,
  fetchNewsDetail,
  fetchMasterCampus,
}
