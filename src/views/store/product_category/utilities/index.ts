import { ApiProductCategory } from '../../../../constants/ApiProductCategory'
import httpService from '../../../../utilities/httpService'
import { IProductCategoryFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IProductCategoryDetailResponse, IProductCategoryResponse } from '../interfaces'
import { IProductCategoryFilter } from '../components/filter/interfaces'

const fetchProductCategory = async (signal: AbortSignal, filter?: IProductCategoryFilter) => {
  return await httpService.get<IProductCategoryResponse>({
    url: `${ApiProductCategory.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchProductCategoryDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IProductCategoryDetailResponse>({
    url: `${ApiProductCategory.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveProductCategory = async (data: IProductCategoryFormData, signal: AbortSignal) => {
  return await httpService.post<IProductCategoryResponse>({
    url: ApiProductCategory.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export { fetchProductCategory, saveProductCategory, fetchProductCategoryDetail }
