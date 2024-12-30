import { ApiFE } from '../../../constants/ApiFE'
import { IAnnouncementDetailResponse } from '../../home/components/home_announcement/interfaces/index'
import httpService from '../../../utilities/httpService'

export const fetchAnnouncementDetail = async (announcementID: string, signal: AbortSignal) => {
  return await httpService.get<IAnnouncementDetailResponse>({
    url: `${ApiFE.getAnnouncement}/${announcementID}`,
    options: {
      signal,
    },
  })
}
