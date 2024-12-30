import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiCollection } from '../../../../constants/ApiCollection'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IDefaultResponse } from '../../../../interfaces/IResponse'
import httpService from '../../../../utilities/httpService'
import { IProductFilter } from '../components/product_filter/interfaces'
import { IProductFormData } from '../components/product_form/interfaces'
import {
  IProductDDCResponse,
  IProductDetailResponse,
  IProductPublisherResponse,
  IProductResponse,
} from '../interfaces'

export const getCollection = async (signal: AbortSignal, filter?: IProductFilter) => {
  return await httpService.get<IProductResponse>({
    url: ApiCollection.get,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}

export const getDetailCollection = async (collectionID: string, signal: AbortSignal) => {
  return await httpService.get<IProductDetailResponse>({
    url: `${ApiCollection.get}/${collectionID}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const getDDC = async (signal: AbortSignal) => {
  return await httpService.get<IProductDDCResponse>({
    url: ApiCollection.getDDC,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const getPublisher = async (signal: AbortSignal) => {
  return await httpService.get<IProductPublisherResponse>({
    url: ApiCollection.getPublisher,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const fetchCollectionType = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCollection.fetchCollectionType,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const fetchSupplement = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCollection.fetchSupplement,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const fetchCollectionSubject = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCollection.fetchCollectionSubject,
    options: {
      signal,
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

export const fetchCollectionBookType = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCollection.fetchCollectionBookType,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const saveCollection = async (data: IProductFormData, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiCollection.save,
    data: preparePostData(data),
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

const preparePostData = (data: IProductFormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authorList, language, ...postData } = data
  return postData
}
