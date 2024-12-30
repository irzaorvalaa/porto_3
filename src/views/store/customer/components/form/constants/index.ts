import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { ICustomerFormData } from '../interfaces'

export const CustomerSchema = yup.object({
  name: yup.string().required().label('Name'),
})

export const initialCustomerFormdata: ICustomerFormData = {
  action: 'Add',
  id: '',
  name: '',
}
