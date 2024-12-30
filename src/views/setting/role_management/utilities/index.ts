import { ApiRole } from '../../../../constants/ApiRole'
import httpService from '../../../../utilities/httpService'
import { IRoleManagementFormData } from '../components/role_management_form/interfaces'
import {
  IRoleManagementDetailResponse,
  IRoleManagementMenuResponse,
  IRoleManagementResponse,
} from '../interfaces'

const fetchRoleManagement = async (signal: AbortSignal) => {
  return await httpService.get<IRoleManagementResponse>({
    url: ApiRole.get,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const saveRoleManagement = async (data: IRoleManagementFormData, signal: AbortSignal) => {
  return await httpService.post<IRoleManagementResponse>({
    url: ApiRole.save,
    urlType: 'BE',
    data,
    options: {
      signal,
    },
  })
}

const fetchRoleManagementMenu = async (signal: AbortSignal) => {
  return await httpService.get<IRoleManagementMenuResponse>({
    url: ApiRole.getMenu,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

const fetchRoleManagementDetail = async (id: string, signal: AbortSignal) => {
  return await httpService.get<IRoleManagementDetailResponse>({
    url: `${ApiRole.get}/${id}`,
    urlType: 'BE',
    options: {
      signal,
    },
  })
}

export {
  fetchRoleManagement,
  saveRoleManagement,
  fetchRoleManagementMenu,
  fetchRoleManagementDetail,
}
