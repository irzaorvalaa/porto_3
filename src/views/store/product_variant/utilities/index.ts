import { ApiCollectionType } from '../../../../constants/ApiCollectionType'
import httpService from '../../../../utilities/httpService'
import { IProductVariantFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IProductVariantDetailResponse, IProductVariantResponse } from '../interfaces'
import { IProductVariantFilter } from '../components/filter/interfaces'

const fetchProductVariant = async (signal: AbortSignal, filter?: IProductVariantFilter) => {
  return await httpService.get<IProductVariantResponse>({
    url: `${ApiCollectionType.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchProductVariantDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IProductVariantDetailResponse>({
    url: `${ApiCollectionType.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveProductVariant = async (data: IProductVariantFormData, signal: AbortSignal) => {
  return await httpService.post<IProductVariantResponse>({
    url: ApiCollectionType.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export { fetchProductVariant, saveProductVariant, fetchProductVariantDetail }
