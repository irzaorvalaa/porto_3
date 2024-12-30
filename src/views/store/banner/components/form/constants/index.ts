import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IBannerFormData } from '../interfaces'

export const BannerSchema = yup.object({
  name: yup.string().required().label('Name'),
})

export const initialBannerFormdata: IBannerFormData = {
  action: 'Add',
  id: '',
  name: '',
  scopeNote: '',
  broaderTerm: '',
  narrowerTerm: '',
  usedFor: '',
  relatedTerm: '',
}
