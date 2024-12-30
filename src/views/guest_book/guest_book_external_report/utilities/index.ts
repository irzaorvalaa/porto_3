import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiGuestBookExternalReport } from '../../../../constants/ApiGuestBookExternalReport'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import httpService from '../../../../utilities/httpService'
import { IGuestBookExternalReportFilter } from '../components/filter/interfaces'
import { IGuestBookExternalReportResponse } from '../interfaces'

export const getReport = async (signal: AbortSignal, filter?: IGuestBookExternalReportFilter) => {
  return await httpService.get<IGuestBookExternalReportResponse>({
    url: ApiGuestBookExternalReport.get,
    options: {
      signal,
      params: filter,
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

export const exportExcel = async (signal: AbortSignal, filter?: IGuestBookExternalReportFilter) => {
  return await httpService.get<any>({
    url: ApiGuestBookExternalReport.export,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}
