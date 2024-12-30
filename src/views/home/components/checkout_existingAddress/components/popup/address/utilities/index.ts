import { ApiCollectionType } from '../../../../../../../../constants/ApiCollectionType'
import httpService from '../../../../../../../../utilities/httpService'
import { IAddressFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../../../../../interfaces/IGeneralFetch'
import { IAddressDetailResponse, IAddressResponse } from '../interfaces'
import { IAddressFilter } from '../components/filter/interfaces'

const fetchAddress = async (signal: AbortSignal, filter?: IAddressFilter) => {
  return await httpService.get<IAddressResponse>({
    url: `${ApiCollectionType.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchAddressDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IAddressDetailResponse>({
    url: `${ApiCollectionType.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveAddress = async (data: IAddressFormData, signal: AbortSignal) => {
  return await httpService.post<IAddressResponse>({
    url: ApiCollectionType.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export { fetchAddress, saveAddress, fetchAddressDetail }
