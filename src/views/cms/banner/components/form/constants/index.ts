import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IBannerFormData } from '../interfaces'

export const BannerSchema = yup.object({
  headline: yup.string().nullable().label('Headline / Title'),
  effDateStart: yup.string().required().label('Start Date'),
  effDateEnd: yup.string().required().label('End Date'),
  externalUrl: yup.string().nullable().label('External Url'),
  sequenceNo: yup.number().required().label('Sequence No'),
  caption: yup.string().nullable().label('Caption'),
})

export const initialBannerFormdata: IBannerFormData = {
  action: 'Add',
  id: '',
  fileName: '',
  fileData: '',
  headline: '',
  effDateStart: '',
  effDateEnd: '',
  externalUrl: '',
  sequenceNo: 0,
  caption: '',
}