import { ApiCampus } from '../../../../constants/ApiCampus'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IDefaultResponse } from '../../../../interfaces/IResponse'
import httpService from '../../../../utilities/httpService'
import { ICampusFormData } from '../components/campus_form/interfaces'
import { ICMSCampusDetailResponse, ICMSCampusResponse } from '../interfaces'

export const getCampus = async (signal: AbortSignal) => {
  return await httpService.get<ICMSCampusResponse>({
    url: ApiCampus.get,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const getCampusDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<ICMSCampusDetailResponse>({
    url: `${ApiCampus.get}/${id}`,
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

export const saveCampus = async (data: ICampusFormData, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiCampus.save,
    data: preparePostData(data),
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

const preparePostData = (data: ICampusFormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pic, serviceHour, ...postData } = data
  return postData
}
