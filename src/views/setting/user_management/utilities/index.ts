import { ApiUser } from '../../../../constants/ApiUser'
import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiRole } from '../../../../constants/ApiRole'
import { ApiBM7 } from '../../../../constants/ApiBM7'
import httpService from '../../../../utilities/httpService'
import { IUserManagementFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IUserManagementDetailResponse,
  IUserManagementResponse,
  IUserManagementLookupResponse,
} from '../interfaces'
import { IUserManagementFilter } from '../components/filter/interfaces'
import { ApiMember } from '../../../../constants/ApiMember'

const fetchUserManagement = async (signal: AbortSignal, filter?: IUserManagementFilter) => {
  return await httpService.get<IUserManagementResponse>({
    url: `${ApiUser.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchUserManagementDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IUserManagementDetailResponse>({
    url: `${ApiUser.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveUserManagement = async (data: IUserManagementFormData, signal: AbortSignal) => {
  return await httpService.post<IUserManagementResponse>({
    url: ApiUser.save,
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

const fetchAcademicProgram = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicProgram,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const fetchMasterRole = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiRole.fetch,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const fetchLookupMemberByBinusian = async (binusianID: string, signal: AbortSignal) => {
  return await httpService.get<IUserManagementLookupResponse>({
    url: `${ApiMember.lookupBinusianID}/${binusianID}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

const fetchLookupUserByBinusian = async (binusianID: string, signal: AbortSignal) => {
  return await httpService.get<IUserManagementLookupResponse>({
    url: `${ApiUser.lookupBinusianID}/${binusianID}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export {
  fetchUserManagement,
  saveUserManagement,
  fetchUserManagementDetail,
  fetchMasterCampus,
  fetchAcademicProgram,
  fetchMasterRole,
  fetchLookupMemberByBinusian,
  fetchLookupUserByBinusian,
}
