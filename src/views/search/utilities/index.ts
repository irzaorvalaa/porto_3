import { ApiFE } from '../../../constants/ApiFE'
import { ICollectionResponse } from '../../../interfaces/ICollection'
import httpService from '../../../utilities/httpService'

export const fetchCollection = async (keyword: string, signal: AbortSignal) => {
  return await httpService.get<ICollectionResponse>({
    url: ApiFE.searchCollection + keyword,
    options: {
      signal,
    },
  })
}
