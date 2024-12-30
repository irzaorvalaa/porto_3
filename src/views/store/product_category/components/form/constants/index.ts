import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IProductCategoryFormData } from '../interfaces'

export const ProductCategorySchema = yup.object({
  id: yup.string().required().label('ProductCategory No.'),
  label: yup.string().required().label('Name'),
})

export const initialProductCategoryFormdata: IProductCategoryFormData = {
  action: 'Add',
  id: '',
  label: '',
  topic: '',
}
