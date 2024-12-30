import { ApiMember } from '../../../../constants/ApiMember'
import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiBM7 } from '../../../../constants/ApiBM7'
import httpService from '../../../../utilities/httpService'
import { IMemberManagementFormData } from '../components/form/interfaces'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import {
  IMemberManagementDetailResponse,
  IMemberManagementLookupResponse,
  IMemberManagementResponse,
} from '../interfaces'
import { IMemberManagementFilter } from '../components/filter/interfaces'

const fetchMemberManagement = async (signal: AbortSignal, filter?: IMemberManagementFilter) => {
  return await httpService.get<IMemberManagementResponse>({
    url: `${ApiMember.get}`,
    urlType: 'BE',
    options: {
      signal,
      params: filter,
    },
  })
}

const fetchMemberManagementDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IMemberManagementDetailResponse>({
    url: `${ApiMember.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}


const saveMemberManagement = async (data: IMemberManagementFormData, signal: AbortSignal) => {
  return await httpService.post<IMemberManagementResponse>({
    url: ApiMember.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

const fetchLookupMemberByMemberCode = async (memberCode: string, signal: AbortSignal) => {
  return await httpService.get<IMemberManagementLookupResponse>({
    url: `${ApiMember.lookupMemberCode}/${memberCode}`,
    options: {
      signal,
    },
    urlType: 'BE',
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

const fetchAcademicOrganization = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicOrganization,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const fetchAcademicGroup = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiBM7.fetchAcademicGroup,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

export {
  fetchMemberManagement,
  saveMemberManagement,
  fetchLookupMemberByMemberCode,
  fetchMemberManagementDetail,
  fetchMasterCampus,
  fetchAcademicProgram,
  fetchAcademicOrganization,
  fetchAcademicGroup,
}
