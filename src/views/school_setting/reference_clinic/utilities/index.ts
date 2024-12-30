import { ApiCampus } from '../../../../constants/ApiCampus'
import { ApiFE } from '../../../../constants/ApiFE'
import { ApiReferenceService } from '../../../../constants/ApiReferenceService'
import { IGeneralFetchResponse } from '../../../../interfaces/IGeneralFetch'
import { IDefaultResponse } from '../../../../interfaces/IResponse'
import httpService from '../../../../utilities/httpService'
import { IReferenceClinicFilter } from '../components/reference_clinic_filter/interfaces'
import { IReferenceClinicFormData } from '../components/reference_clinic_form/interfaces'
import { IReferenceClinicDetailResponse, IReferenceClinicResponse } from '../interfaces'

export const getReferenceClinic = async (signal: AbortSignal, filter?: IReferenceClinicFilter) => {
  return await httpService.get<IReferenceClinicResponse>({
    url: ApiReferenceService.getReferenceClinic,
    options: {
      signal,
      params: filter,
    },
    urlType: 'BE',
  })
}

export const getDetailReferenceClinic = async (referenceID: string, signal: AbortSignal) => {
  return await httpService.get<IReferenceClinicDetailResponse>({
    url: `${ApiReferenceService.getReferenceClinic}/${referenceID}`,
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

export const fetchTopic = async (campusId: string, signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: `${ApiReferenceService.fetchTopic}/${campusId}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const fetchMeetingLink = async (signal: AbortSignal) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiReferenceService.fetchMeetingLink,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const getReferenceSchedule = async (
  campusID: string,
  appointmentDate: string,
  signal: AbortSignal,
) => {
  return await httpService.get<IGeneralFetchResponse>({
    url: ApiFE.getReference + campusID,
    options: {
      signal,
      params: {
        AppointmentDate: appointmentDate,
      },
    },
  })
}

export const saveReferenceClinic = async (data: IReferenceClinicFormData, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiReferenceService.saveReferenceClinic,
    data: preparePostData(data),
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

const preparePostData = (data: IReferenceClinicFormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { picList, participantList, ...postData } = data
  return postData
}
