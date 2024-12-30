import { ApiFE } from '../../../constants/ApiFE'
import { ICampusResponse } from '../../../interfaces/ICampus'
import { IDefaultResponse } from '../../../interfaces/IResponse'
import httpService from '../../../utilities/httpService'
import { IFetchResponse, IMemberResponse, ITalkToUsFormData } from '../interfaces'

export const lookupByEmail = async (email: string, signal: AbortSignal) => {
  return await httpService.get<IMemberResponse>({
    url: ApiFE.lookupByEmail + email,
    options: {
      signal,
    },
  })
}

export const fetchCampus = async (signal: AbortSignal) => {
  return await httpService.get<ICampusResponse>({
    url: ApiFE.getCampus,
    options: {
      signal,
    },
  })
}

export const getTopic = async (campusID: string, signal: AbortSignal) => {
  return await httpService.get<IFetchResponse>({
    url: ApiFE.getTopic + campusID,
    options: {
      signal,
    },
  })
}

export const getReference = async (
  campusID: string,
  appointmentDate: string,
  signal: AbortSignal,
) => {
  return await httpService.get<IFetchResponse>({
    url: ApiFE.getReference + campusID,
    options: {
      signal,
      params: {
        AppointmentDate: appointmentDate,
      },
    },
  })
}

export const saveReference = async (data: ITalkToUsFormData, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiFE.saveReference,
    data,
    options: {
      signal,
    },
  })
}
