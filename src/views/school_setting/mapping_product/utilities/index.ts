import { ApiMappingProduct } from '../../../../constants/ApiMappingProduct'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { IMappingProductFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IMappingProductDetailResponse, IMappingProductResponse } from '../interfaces'
import { IMappingProductFilter } from '../components/filter/interfaces'

const fetchMappingProduct = async (signal: AbortSignal, filter?: IMappingProductFilter) => {
  return await httpService.get<IMappingProductResponse>({
    url: `${ApiMappingProduct.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchMappingProductDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IMappingProductDetailResponse>({
    url: `${ApiMappingProduct.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveMappingProduct = async (data: IMappingProductFormData, signal: AbortSignal) => {
  return await httpService.post<IMappingProductResponse>({
    url: ApiMappingProduct.save,
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

export { fetchMappingProduct, saveMappingProduct, fetchMappingProductDetail, fetchMasterCampus }
