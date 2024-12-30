import { ITalkToUsConfirm, ITalkToUsResponse } from '../interfaces'
import httpService from '../../../utilities/httpService'
import { ApiFE } from '../../../constants/ApiFE'
import { IDefaultResponse } from '../../../interfaces/IResponse'

export const fetchTalkToUs = async (signal: AbortSignal) => {
  return await httpService.get<ITalkToUsResponse>({
    url: ApiFE.getTalkToUs,
    options: {
      signal,
    },
  })
}

export const confirmTalkToUs = async (data: ITalkToUsConfirm, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiFE.confirmTalkToUs,
    data,
    options: {
      signal,
    },
  })
}