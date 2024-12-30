import { ApiCampus } from '../../../constants/ApiCampus'
import { ApiGuestBook } from '../../../constants/ApiGuestBook'
import { ApiMember } from '../../../constants/ApiMember'
import { IGeneralFetchResponse } from '../../../interfaces/IGeneralFetch'
import { IDefaultResponse } from '../../../interfaces/IResponse'
import httpService from '../../../utilities/httpService'
import { ICMSCampusResponse } from '../../cms/campus/interfaces'
import { IGuestBookBinusianFormData } from '../components/guest_book_binusian_form/interfaces'
import { IGuestBookMemberResponse } from '../interfaces'

export const fetchCampus = async (signal: AbortSignal) => {
  return await httpService.get<ICMSCampusResponse>({
    url: ApiCampus.get,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const lookupMemberCode = async (memberCode: string, signal: AbortSignal) => {
  return await httpService.get<IGuestBookMemberResponse>({
    url: `${ApiMember.lookupMemberCode}/${memberCode}`,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}

export const saveGuestBook = async (data: IGuestBookBinusianFormData, signal: AbortSignal) => {
  return await httpService.post<IDefaultResponse<any>>({
    url: ApiGuestBook.internalSave,
    data,
    options: {
      signal,
    },
    urlType: 'BE',
  })
}
