import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IMerchantFormData } from '../interfaces'

export const MerchantSchema = yup.object({
  name: yup.string().required().label('Name'),
  city: yup.string().required().label('City'),
  phoneNumber: yup.string().nullable().label('Phone Number'),
  email: yup.string().email().label('Email'),
})

export const initialMerchantFormdata: IMerchantFormData = {
  action: 'Add',
  id: '',
  name: '',
  city: '',
  phoneNumber: '',
  email: '',
  address: '',
  sharedUsername: '',
  sharedPassword: '',
  isLTI: 'T',
}
