import { ApiFE } from '../../../constants/ApiFE'
import { INewsEventDetailResponse } from '../../home/components/home_news_event/interfaces/index'
import httpService from '../../../utilities/httpService'

export const fetchNewsEventDetail = async (NewsID: string, signal: AbortSignal) => {
  return await httpService.get<INewsEventDetailResponse>({
    url: `${ApiFE.getNews}/${NewsID}`,
    options: {
      signal,
    },
  })
}
