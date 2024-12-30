import { ApiFE } from '../../../constants/ApiFE'
import { ICampusDetailResponse } from '../../../interfaces/ICampus'
import httpService from '../../../utilities/httpService'

export const fetchCampus = async (campusID: string, signal: AbortSignal) => {
  return await httpService.get<ICampusDetailResponse>({
    url: `${ApiFE.getCampus}/${campusID}`,
    options: {
      signal,
    },
  })
}
