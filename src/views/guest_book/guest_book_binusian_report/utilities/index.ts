import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiBM7 } from '../../../../constants/ApiBM7'
import { ApiGuestBookBinusianReport } from '../../../../constants/ApiGuestBookBinusianReport'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import httpService from '../../../../utilities/httpService'
import { IGuestBookBinusianReportFilter } from '../components/filter/interfaces'
import { IGuestBookBinusianReportResponse } from '../interfaces'

export const getReport = async (signal: AbortSignal, filter?: IGuestBookBinusianReportFilter) => {
  return await httpService.get<IGuestBookBinusianReportResponse>({
    url: ApiGuestBookBinusianReport.get,
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


export const fetchAcademicProgram = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicProgram,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

export const fetchAcademicOrganization = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicOrganization,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

export const fetchAcademicGroup = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicGroup,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


export const exportExcel = async (signal: AbortSignal, filter?: IGuestBookBinusianReportFilter) => {
  return await httpService.get<any>({
    url: ApiGuestBookBinusianReport.export,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}
