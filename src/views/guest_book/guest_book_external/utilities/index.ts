import { ApiGuestBookExternal } from '../../../../constants/ApiGuestBookExternal'
import { ApiCampus } from '../../../../constants/ApiCampus'
import httpService from '../../../../utilities/httpService'
import { IGuestBookExternalFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IGuestBookExternalDetailResponse,
  IGuestBookExternalResponse,
} from '../interfaces'
import { IGuestBookExternalFilter } from '../components/filter/interfaces'

const fetchGuestBookExternal = async (signal: AbortSignal, filter?: IGuestBookExternalFilter) => {
  return await httpService.get<IGuestBookExternalResponse>({
    url: `${ApiGuestBookExternal.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchGuestBookExternalDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IGuestBookExternalDetailResponse>({
    url: `${ApiGuestBookExternal.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveGuestBookExternal = async (data: IGuestBookExternalFormData, signal: AbortSignal) => {
  return await httpService.post<IGuestBookExternalResponse>({
    url: ApiGuestBookExternal.save,
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
  fetchGuestBookExternal,
  saveGuestBookExternal,
  fetchGuestBookExternalDetail,
  fetchMasterCampus,
}
