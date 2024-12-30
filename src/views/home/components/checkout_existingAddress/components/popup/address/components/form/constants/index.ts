import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../../../../../interfaces/IGeneralFetch'
import { IAddressFormData } from '../interfaces'

export const AddressSchema = yup.object({
  label: yup.string().required().label('Name'),
  isDigital: yup.string().required().label('Type'),
})

export const initialAddressFormdata: IAddressFormData = {
  action: 'Add',
  id: '',
  label: '',
  isDigital: '',
}

export const arrFormDigitalType: IFormDataOption[] = [
  {
    value: 'T',
    label: 'Digital',
  },
  {
    value: 'F',
    label: 'Physical',
  },
]
