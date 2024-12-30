import { ApiFE } from '../../../constants/ApiFE'
import { ICollectionDetailResponse } from '../../../interfaces/ICollection'
import httpService from '../../../utilities/httpService'

export const fetchCollection = async (collectionID: string, signal: AbortSignal) => {
  return await httpService.get<ICollectionDetailResponse>({
    url: `${ApiFE.getCollection}/${collectionID}`,
    options: {
      signal,
    },
  })
}
