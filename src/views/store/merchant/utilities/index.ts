import { ApiMerchant } from '../../../../constants/ApiMerchant'
import httpService from '../../../../utilities/httpService'
import { IMerchantFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IMerchantDetailResponse, IMerchantResponse } from '../interfaces'
import { IMerchantFilter } from '../components/filter/interfaces'

const fetchMerchant = async (signal: AbortSignal, filter?: IMerchantFilter) => {
  return await httpService.get<IMerchantResponse>({
    url: `${ApiMerchant.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchMerchantDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IMerchantDetailResponse>({
    url: `${ApiMerchant.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveMerchant = async (data: IMerchantFormData, signal: AbortSignal) => {
  return await httpService.post<IMerchantResponse>({
    url: ApiMerchant.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export { fetchMerchant, saveMerchant, fetchMerchantDetail }
