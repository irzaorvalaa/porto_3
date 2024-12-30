import { ApiFE } from '../../../constants/ApiFE'
import { ICollectionResponse } from '../../../interfaces/ICollection'
import httpService from '../../../utilities/httpService'

export const fetchCollection = async (category: string, signal: AbortSignal) => {
  return await httpService.get<ICollectionResponse>({
    url: ApiFE.getCollectionBy + category,
    options: {
      signal,
    },
  })
}
