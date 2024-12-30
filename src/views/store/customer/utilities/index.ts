import { ApiCustomer } from '../../../../constants/ApiCustomer'
import httpService from '../../../../utilities/httpService'
import { ICustomerFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { ICustomerDetailResponse, ICustomerResponse } from '../interfaces'
import { ICustomerFilter } from '../components/filter/interfaces'

const fetchCustomer = async (signal: AbortSignal, filter?: ICustomerFilter) => {
  return await httpService.get<ICustomerResponse>({
    url: `${ApiCustomer.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchCustomerDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<ICustomerDetailResponse>({
    url: `${ApiCustomer.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveCustomer = async (data: ICustomerFormData, signal: AbortSignal) => {
  return await httpService.post<ICustomerResponse>({
    url: ApiCustomer.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

export { fetchCustomer, saveCustomer, fetchCustomerDetail }
