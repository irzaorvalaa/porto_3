import { ApiBM7 } from '../../../../constants/ApiBM7'
import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiLoginReport } from '../../../../constants/ApiLoginReport'
import { ApiReferenceService } from '../../../../constants/ApiReferenceService'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import httpService from '../../../../utilities/httpService'
import { IUserLoginReportFilter } from '../components/filter/interfaces'
import { IUserLoginReportResponse } from '../interfaces'

export const getReport = async (signal: AbortSignal, filter?: IUserLoginReportFilter) => {
  return await httpService.get<IUserLoginReportResponse>({
    url: ApiLoginReport.get,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}

export const exportExcel = async (signal: AbortSignal, filter?: IUserLoginReportFilter) => {
  return await httpService.get<any>({
    url: ApiLoginReport.export,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}


export const fetchMasterCampus = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiCampus.fetch,
    urlType: 'BE',
    options: {
      signal,
    },
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
