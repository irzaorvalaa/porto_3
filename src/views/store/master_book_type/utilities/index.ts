import { ApiCollectionBookType } from '../../../../constants/ApiCollectionBookType'
import httpService from '../../../../utilities/httpService'
import { IBookTypeFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IBookTypeDetailResponse,
  IBookTypeResponse,
} from '../interfaces'
import { IBookTypeFilter } from '../components/filter/interfaces'

const fetchBookType = async (signal: AbortSignal, filter?: IBookTypeFilter) => {
  return await httpService.get<IBookTypeResponse>({
    url: `${ApiCollectionBookType.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchBookTypeDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IBookTypeDetailResponse>({
    url: `${ApiCollectionBookType.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveBookType = async (data: IBookTypeFormData, signal: AbortSignal) => {
  return await httpService.post<IBookTypeResponse>({
    url: ApiCollectionBookType.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export {
  fetchBookType,
  saveBookType,
  fetchBookTypeDetail,
}
