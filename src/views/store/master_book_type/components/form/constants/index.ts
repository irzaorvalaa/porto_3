import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IBookTypeFormData } from '../interfaces'

export const BookTypeSchema = yup.object({
  label: yup.string().required().label('Name'),
})

export const initialBookTypeFormdata: IBookTypeFormData = {
  action: 'Add',
  id: '',
  label: '',
}